import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const newUrl = 'https://userauthbackend.up.railway.app/register';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const { data, status } = await axios.post(newUrl, {
        name: name,
        email: email,
        password: password,
      });

      if (status === 200) {
        navigate('/login');
        toast.success('User registered successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
