from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import date
from collections import defaultdict
from fastapi import UploadFile, File
import pandas as pd
from io import BytesIO
from passlib.context import CryptContext

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ------------------ Models ------------------

class User(BaseModel):
    username: str
    password: str

class Transaction(BaseModel):
    title: str
    amount: float
    category: str
    type: str  # "income" or "expense"
    date: date

# ------------------ Storage ------------------

users = {}  # username -> hashed password
transactions: List[Transaction] = []

# ------------------ Summary Logic ------------------

def calculate_summary():
    total_income = sum(t.amount for t in transactions if t.type == "income")
    total_expense = sum(t.amount for t in transactions if t.type == "expense")
    balance = total_income - total_expense
    category_data = defaultdict(float)
    for t in transactions:
        if t.type == "expense":
            category_data[t.category] += t.amount

    categories = [
        {"name": k, "value": v}
        for k, v in category_data.items()
    ]

    monthly_income_data = defaultdict(float)
    monthly_expense_data = defaultdict(float)

    for t in transactions:
        month = t.date.strftime("%b")

        if t.type == "income":
            monthly_income_data[month] += t.amount
        elif t.type == "expense":
            monthly_expense_data[month] += t.amount

    monthly_income = [
        {"month": k, "amount": v}
        for k, v in monthly_income_data.items()
    ]

    monthly_expense = [
        {"month": k, "amount": v}
        for k, v in monthly_expense_data.items()
    ]

    monthly_savings = []
    all_months = set(list(monthly_income_data.keys()) + list(monthly_expense_data.keys()))

    for month in all_months:
        income_amt = monthly_income_data.get(month, 0)
        expense_amt = monthly_expense_data.get(month, 0)

        monthly_savings.append({
            "month": month,
            "savings": income_amt - expense_amt
        })

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": balance,
        "categories": categories,
        "monthly_income": monthly_income,
        "monthly_expense": monthly_expense,
        "monthly_savings": monthly_savings
    }

# ------------------ Root ------------------

@app.get("/")
def root():
    return {"message": "Backend is running"}

# ------------------ Signup ------------------

@app.post("/signup")
def signup(user: User):

    if user.username in users:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)
    users[user.username] = hashed_password

    return {"message": "User registered successfully"}

# ------------------ Login ------------------

@app.post("/login")
def login(user: User):

    stored_password = users.get(user.username)

    if not stored_password:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not pwd_context.verify(user.password, stored_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "username": user.username
    }

# ------------------ Add Transaction ------------------

@app.post("/transactions")
def add_transaction(transaction: Transaction):
    transactions.append(transaction)
    return {
        "message": "Transaction added successfully",
        "dashboard": calculate_summary()
    }

# ------------------ Get Transactions ------------------

@app.get("/transactions")
def get_transactions():
    return transactions

# ------------------ Dashboard Summary ------------------

@app.get("/dashboard-summary")
def get_dashboard_summary():
    return calculate_summary()

# ------------------ Upload File ------------------

@app.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):

    contents = await file.read()

    if file.filename.endswith(".csv"):
        df = pd.read_csv(BytesIO(contents))
    elif file.filename.endswith(".xlsx"):
        df = pd.read_excel(BytesIO(contents))
    else:
        return {"error": "Only CSV or Excel files allowed"}

    for _, row in df.iterrows():
        transaction = Transaction(
            title=str(row["title"]),
            amount=float(row["amount"]),
            category=str(row["category"]),
            type=str(row["type"]).lower(),
            date=pd.to_datetime(row["date"]).date()
        )

        transactions.append(transaction)

    return {
        "message": "File uploaded successfully",
        "dashboard": calculate_summary()
    }