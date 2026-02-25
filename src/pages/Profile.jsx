import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      navigate("/");
      return;
    }

    setUsername(storedUsername);

    // Fetch dashboard summary
    fetch("http://localhost:8000/dashboard-summary")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
      })
      .catch((err) => {
        console.error("Error fetching summary:", err);
      });

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>User Profile</h2>

        <div className="profile-info">
          <p><strong>Username:</strong> {username}</p>

          {summary && (
            <>
              <p><strong>Total Income:</strong> ₹{summary.total_income}</p>
              <p><strong>Total Expense:</strong> ₹{summary.total_expense}</p>
              <p><strong>Balance:</strong> ₹{summary.balance}</p>
            </>
          )}
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;