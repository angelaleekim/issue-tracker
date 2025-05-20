import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { TextInput, Button, Box, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './Login.module.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
      password: (value) =>
        value.trim().length > 0 ? null : 'Password is required',
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (values: typeof form.values) => {
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
          body: JSON.stringify(values),
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

  return (
    <Box className={classes.container}>
      <Title order={2} className={classes.heading}>
        Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps('email')}
          className={classes.input}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          {...form.getInputProps('password')}
          className={classes.input}
        />
        <Button type="submit" className={classes.button}>
          Login
        </Button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Box>
  );
};

export default Login;
