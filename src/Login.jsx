import { useState } from "react";
import { addUser, loginUser } from "./firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        const user = await loginUser(email, password);
        if (user) {
          sessionStorage.setItem("userId", user.id);
          sessionStorage.setItem("alias", user.alias);
          navigate("/todo-list");
        } else {
          setError("Invalid email or password.");
        }
      } else {
        const userId = await addUser({ alias, email, password });
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("alias", alias);
        navigate("/todo-list");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="alias">Alias:</label>
            <input type="text" name="alias" value={alias} onChange={(e) => setAlias(e.target.value)} required />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button
        onClick={() => {
          setIsLogin(false);
          setError(null);
        }}
      >
        No account? Then Register!
      </button>
    </div>
  );
}
