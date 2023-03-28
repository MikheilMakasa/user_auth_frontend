import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const newUrl = 'https://user-auth-backend.vercel.app/login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(newUrl, {
        email: email,
        password: password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        // Handle error: No token returned from server
        console.error('No token returned from server');
      }
    } catch (error) {
      // Handle error: Request failed or returned a non-200 status
      console.error(error.response?.data?.error ?? error.message);
    }
  };

  return (
    <div className='register-form'>
      <h2 className='form-title'>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit'>Login</button>
        <div className='question'>
          <p>
            Not registered?{' '}
            <span className='btns' onClick={() => navigate('/register')}>
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
