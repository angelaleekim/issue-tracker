import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import classes from './Register.module.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true); // Add state to check authentication
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect logged-in users to the dashboard
    } else {
      setCheckingAuth(false); // Allow rendering the register page if not authenticated
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notifications.show({
        color: 'red',
        title: 'Registration Failed',
        message: 'Passwords do not match',
        icon: <IconX size={18} />,
        autoClose: 2000,
      });
      return;
    }

    const id = notifications.show({
      loading: true,
      title: 'Registering',
      message: 'Please wait while we create your account...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const response = await fetch(
        'https://issue-tracker-m82y.onrender.com/api/users/register',
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
          title: 'Registration Failed',
          message: error,
          loading: false,
          icon: <IconX size={18} />,
          autoClose: 2000,
        });
        return;
      }

      notifications.update({
        id,
        color: 'teal',
        title: 'Registration Successful',
        message: 'Your account has been created!',
        loading: false,
        icon: <IconCheck size={18} />,
        autoClose: 2000,
      });

      navigate('/login');
    } catch (err) {
      console.error('Error registering user:', err);
      notifications.update({
        id,
        color: 'red',
        title: 'Registration Failed',
        loading: false,
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
      <h2 className={classes.heading}>Register</h2>
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
        <div className={classes.formGroup}>
          <label htmlFor="confirmPassword" className={classes.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classes.input}
            required
          />
        </div>
        <button type="submit" className={classes.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
