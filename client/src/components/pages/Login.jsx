import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/auth/authSlice';
import Spinner from '../shared/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      navigate('/dashboard');
      navigate(0);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInput = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email, 
      password
    }

    dispatch(login(userData));
  }

  if(isLoading) {
    return <Spinner />;
  }

  return (
    <div className='login-div w-50 mt-3'>
      <h1 className='text-center'>
        <FaSignInAlt className='mb-2' /> Login
        <p>Login to start keeping track of your listen history!</p>
      </h1>

      <section className='form'>
        <form onSubmit={ handleSubmit }>
          <div className='form-floating mb-3'>
            <input
              type = 'email'
              id = 'email'
              name = 'email'
              value = { email }
              placeholder = 'Enter your email'
              onChange = { handleInput }
              class='form-control'
            />
            <label>Enter your email</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type = 'password'
              id = 'password'
              name = 'password'
              value = { password }
              placeholder = 'Enter a password'
              onChange = { handleInput }
              class='form-control'
            />
            <label>Enter your password</label>
          </div>
          <button className='btn btn-dark-blue w-100'>Submit</button>
        </form>
      </section>
    </div>
    
  )
}

export default Login;