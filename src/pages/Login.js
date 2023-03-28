import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const newUrl = 'https://userauthbackend.up.railway.app/login';

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
        toast.success('logged in');
        navigate('/dashboard');
      } else {
        // Handle error: No token returned from server
        toast.error(data.error);
      }
    } catch (error) {
      // Handle error: Request failed or returned a non-200 status
      toast.error('Wrong email or password!');
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
