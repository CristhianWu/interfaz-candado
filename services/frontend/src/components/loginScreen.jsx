import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const LoginScreen = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Resetea el error en cada intento

        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Guarda el token en localStorage o en un contexto global
            localStorage.setItem('token', data.token);
            // Redirigir al usuario a la página de inicio o donde desees
            history.push('/home'); // Cambia '/home' a la ruta que desees
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Login failed'); // Muestra un mensaje de error
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error */}
            </form>
        </div>
    );
};

export default LoginScreen;
