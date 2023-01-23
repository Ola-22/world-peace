import { setDoc , doc, Timestamp, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserAuthContext } from '../../context/userAuthContext';
import db, { auth } from "./../../firebase"

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useUserAuthContext();
    const [error, setError] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setError("Error! Confirm Password Not Match")
        } else{
           await register(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    email: email,
                    displayName: "user",
                    photoURL: "https://th.bing.com/th/id/OIP.5iQhybpa63ZBY6rM1kqVgwAAAA?w=179&h=192&c=7&r=0&o=5&pid=1.7",
                    createdAt: Timestamp.fromDate(new Date()),
                })
                
                navigate("/dashboard")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });   
        }
      
    }

    return (
        <section className="container">
            <div className="login-body">
                <span>Sign Up</span>
                <form onSubmit={onSubmit}>
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

                    <div className="input-container">
                        <label htmlFor="confirm-password">Password</label>
                        <input
                            type="password"
                            name="confirm-password"
                            placeholder="Confirm Password"
                            id="confirm-password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="error">{error}</div>
                    <button type="submit">Sign up</button>
                </form>

                <p className='content'>
                    Already have an account?{' '}
                    <NavLink to="/" >
                        Sign in
                    </NavLink>
                </p>
            </div>
        </section>
    )
}

export default Signup