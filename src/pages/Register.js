import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    const data = await axios.post(
      'https://user-auth-backend.vercel.app/register',
      {
        name: name,
        email: email,
        password: password,
      }
    );
    console.log(data);

    if (data.statusText === 'OK') {
      navigate('/login');
    }
  };

  return (
    <div className='register-form'>
      <h2 className='form-title'>Register</h2>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type='submit'>Register</button>
        <div className='question'>
          <p>
            Already registered?{' '}
            <span className='btns' onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
