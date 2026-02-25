import { useState } from "react";
import "./Transactions.css";
function Transactions() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount)
      })
    });

    alert("Transaction added");
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/upload-file", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
  <div className="transactions-page">

    <div className="transaction-card">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit} className="transaction-form">
        <input name="title" placeholder="Title" onChange={handleChange} required />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          onChange={handleChange}
          required
        />

        <input name="category" placeholder="Category" onChange={handleChange} required />

        <select name="type" onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input name="date" type="date" onChange={handleChange} required />

        <button type="submit" className="primary-btn">
          Add Transaction
        </button>
      </form>
    </div>

    <div className="upload-card">
      <h3>Upload CSV / Excel</h3>

      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleFileUpload} className="secondary-btn">
        Upload File
      </button>
    </div>

  </div>
);
}

export default Transactions;