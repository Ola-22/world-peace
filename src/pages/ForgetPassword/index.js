import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuthContext } from '../../context/userAuthContext'

export default function ForgotPassword() {
    const { forgotPassword } = useUserAuthContext()
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [error, setError] = useState("")


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);

            setTimeout(() => {
                navigate("/")
            }, 1000)

        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <section className="container">
            <div className="login-body forget-body">
                <span>Forget Password</span>
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

                    <div className="error">{error}</div>

                    <button type="submit">Send</button>
                </form>

            </div>
        </section>
    )
}