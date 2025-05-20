import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { TextInput, Button, Box, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './Register.module.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
      password: (value) =>
        value.trim().length > 0 ? null : 'Password is required',
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
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
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        notifications.update({
          id,
          color: 'red',
          title: 'Registration Failed',
          message: error,
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
        message: 'An error occurred. Please try again.',
        icon: <IconX size={18} />,
        autoClose: 2000,
      });
    }
  };

  return (
    <Box className={classes.container}>
      <Title order={2} className={classes.heading}>
        Register
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
        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          {...form.getInputProps('confirmPassword')}
          className={classes.input}
        />
        <Button type="submit" className={classes.button}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
