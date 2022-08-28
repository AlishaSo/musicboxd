import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return (
    <div className='dashboard-div'>
      <h1>Welcome, { user && user.username } </h1>
      <p>Dashboard</p>
    </div>
  )
}

export default Dashboard;