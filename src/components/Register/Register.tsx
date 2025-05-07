import React, { useState } from 'react';
import classes from './Register.module.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add your registration logic here
  };

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
