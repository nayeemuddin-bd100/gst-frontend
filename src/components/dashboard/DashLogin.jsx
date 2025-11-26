// Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // your firebase config
import { toast } from "sonner";

export default function DashLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] =useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard
      window.location.href = "/#/dashboard?page=home";

      toast.error("Login successful")
    } catch (err) {
      console.log(err)
      toast.error("Invalid credentials")
    }finally{
      setLoading(false)
    }
  };

  return (
<div className="admin-login-form-wrapper">
    <form className="admin-login-form" onSubmit={login}>
    <h1>Admin Login</h1>
  <input
    className="admin-login-input"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    type="email"
    required
  />
  <input
    className="admin-login-input"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    placeholder="Password"
    required
  />
  <button className="admin-login-button" type="submit" disabled={loading}>{loading ? "Logging..." : "Login"}</button>
</form>
</div>

  );
}
