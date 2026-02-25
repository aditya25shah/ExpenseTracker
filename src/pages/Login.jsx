import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
});
    const data = await res.json();

    if (res.ok) {
        localStorage.setItem("username", data.username);
        navigate("/home");
    } else {
        alert("Invalid credentials");
    }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand">ExpenseX</h1>
        <p className="tagline">Track smart. Spend wiser.</p>

        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      <p className="switch-text">
        New to ExpenseX?{" "}
        <span onClick={() => navigate("/signup")} className="link">
            Create Account
        </span>
        </p>
        </div>
    </div>
  );
}

export default Login;