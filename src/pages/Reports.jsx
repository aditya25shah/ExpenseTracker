import { useEffect, useState } from "react";
import './Reports.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";
import "./Reports.css";

function Reports() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard-summary")
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  if (!summary) return <div className="reports-page">Loading...</div>;

  // Combine income & expense per month
  const combinedData = summary.monthly_income.map(incomeItem => {
    const expenseItem = summary.monthly_expense.find(
      e => e.month === incomeItem.month
    );

    return {
      month: incomeItem.month,
      income: incomeItem.amount,
      expense: expenseItem ? expenseItem.amount : 0
    };
  });

  // Top spending category
  const topCategory =
    summary.categories.length > 0
      ? summary.categories.reduce((max, cat) =>
          cat.value > max.value ? cat : max
        )
      : null;

  const ratio =
    summary.total_expense > 0
      ? (summary.total_income / summary.total_expense).toFixed(2)
      : "0";

  const COLORS = ["#6366f1", "#16a34a", "#dc2626", "#f59e0b"];

  return (
    <div className="reports-page">

      <h2>Financial Reports</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="report-card">
          <h4>Total Income</h4>
          <p>₹ {summary.total_income}</p>
        </div>
        <div className="report-card">
          <h4>Total Expense</h4>
          <p>₹ {summary.total_expense}</p>
        </div>
        <div className="report-card">
          <h4>Balance</h4>
          <p>₹ {summary.balance}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="chart-section">
        <h3>Expense Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summary.categories}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {summary.categories.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Comparison */}
      <div className="chart-section">
        <h3>Monthly Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#16a34a" />
            <Bar dataKey="expense" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Savings Trend */}
      <div className="chart-section">
        <h3>Monthly Savings Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={summary.monthly_savings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="savings" stroke="#6366f1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="insights-section">
        {topCategory && (
          <div className="insight-card">
            <h4>Top Spending Category</h4>
            <p>{topCategory.name}</p>
            <span>₹ {topCategory.value}</span>
          </div>
        )}

        <div className="insight-card">
          <h4>Income / Expense Ratio</h4>
          <p>{ratio}</p>
        </div>
      </div>

    </div>
  );
}

export default Reports;