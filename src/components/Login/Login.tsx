import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import classes from './Login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true); // Add state to check authentication
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect logged-in users to the dashboard
    } else {
      setCheckingAuth(false); // Allow rendering the login page if not authenticated
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = notifications.show({
      loading: true,
      title: 'Logging in',
      message: 'Please wait while we verify your credentials...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const response = await fetch(
        'https://issue-tracker-m82y.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        notifications.update({
          id,
          color: 'red',
          title: 'Login Failed',
          message: error,
          icon: <IconX size={18} />,
          autoClose: 2000,
        });
        return;
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);

      notifications.update({
        id,
        color: 'teal',
        loading: false,
        title: 'Login Successful',
        message: 'You have successfully logged in!',
        icon: <IconCheck size={18} />,
        autoClose: 2000,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error logging in:', err);
      notifications.update({
        id,
        color: 'red',
        title: 'Login Failed',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={18} />,
        autoClose: 2000,
      });
    }
  };

  if (checkingAuth) {
    return null; // Prevent rendering until authentication check is complete
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="email" className={classes.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
            required
          />
        </div>
        <button type="submit" className={classes.button}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
