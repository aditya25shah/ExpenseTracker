import { useEffect, useState } from "react";
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
  Legend
} from "recharts";
import "./Dashboard.css";
function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard-summary")
      .then(res => res.json())
      .then(data => {
        console.log(data); // keep temporarily for sanity
        setSummary(data);
      });
  }, []);

  if (!summary) return <div className="dashboard">Loading...</div>;

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <>
    <div className="dashboard">

      {/* Top Cards */}
      <div className="cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p>₹ {summary.total_income}</p>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <p>₹ {summary.total_expense}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>₹ {summary.balance}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">

        {/* Pie Chart - Income vs Expense */}
        <div className="chart-box">
          <h3>Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Income", value: summary.total_income },
                  { name: "Expense", value: summary.total_expense }
                ]}
                dataKey="value"
                outerRadius={80}
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Income */}
        <div className="chart-box">
          <h3>Monthly Income</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.monthly_income || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Expense */}
        <div className="chart-box">
          <h3>Monthly Expense</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.monthly_expense || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Savings */}
        <div className="chart-box">
          <h3>Monthly Savings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.monthly_savings || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="savings" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
    </>
  );
}

export default Dashboard;