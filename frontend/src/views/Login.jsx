import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = (e) => {
        console.log(email, password)
        navigate('/')
    }

    return (
        <>
            <div id='loginContainer' className="loginContainer">
                <div id="loginCard" className='loginCard'>
                    <div id="loginHeader" className="loginHeader">Login</div>
                    <form onSubmit={(e) => handleLogin(e)} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}