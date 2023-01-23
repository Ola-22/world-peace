import "./style.css"
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from "../../firebase";
import { useUserAuthContext } from "../../context/userAuthContext";

function Login() {
    const navigate = useNavigate();
    const { signIn, user } = useUserAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")

    const onLogin = async (e) => {
      e.preventDefault();
      try {
        await signIn(email, password);
        navigate("/dashboard");
        localStorage.setItem("user", JSON.stringify(user))
      } catch (error) {
        // console.log(error.message);
        setError(error.message)
      }
    };

    return (
        <section className="container">
            <div className="login-body">
                <span>Sign in</span>
                <form onSubmit={onLogin}>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                        id="email"
                            name="email"
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input
                         type="password"
                         name="password"
                          placeholder="Password"
                          id="password"
                          required
                          onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="error">{error}</div>

                    <p className="register-link">You Don't Have Acccount <Link to="/register">Register</Link></p>

                    <button type="submit">Sign in</button>
                </form>
            <Link className="forget-password" to="/forget-password">
                Forget Password
            </Link>
            </div>
        </section>
    )
}

export default Login