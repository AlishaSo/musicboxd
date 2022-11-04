import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUp, reset } from '../../features/auth/authSlice';
// import Spinner from '../shared/Spinner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, username, email, password, password2 } = formData;

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

    if(password !== password2) {
      toast.error('Passwords do not match');
    }
    else {
      const userData = {
        name, 
        username,
        email, 
        password
      }

      dispatch(signUp(userData));
    }
  }

  // if(isLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className='sign-up-div'>
      <h1>
        <FaUser /> Sign Up
        <p>Please create an account</p>
      </h1>

      <section className='form'>
        <form onSubmit={ handleSubmit }>
          <div className="form-floating">
            <input
              type = 'text'
              id = 'name'
              name = 'name'
              value = { name }
              placeholder = 'Enter your name'
              onChange={ handleInput }
              class='form-control'
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              type = 'text'
              id = 'username'
              name = 'username'
              value = { username }
              placeholder = 'Enter a username'
              onChange={ handleInput }
              class='form-control'
            />
            <label>Username</label>
          </div>
          <div className="form-floating">
            <input
              type = 'email'
              id = 'email'
              name = 'email'
              value = { email }
              placeholder = 'Enter your email'
              onChange={ handleInput }
              class='form-control'
            />
            <label>Email</label>
          </div>
          <div className="form-floating">
            <input
              type = 'password'
              id = 'password'
              name = 'password'
              value = { password }
              placeholder = 'Enter a password'
              onChange={ handleInput }
              class='form-control'
            />
            <label>Password</label>
          </div>
          <div className="form-floating">
            <input
              type = 'password'
              id = 'password2'
              name = 'password2'
              value = { password2 }
              placeholder = 'Confirm password'
              onChange={ handleInput }
              class='form-control'
            />
            <label>Confirm Password</label>
          </div>
          <button>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default SignUp;