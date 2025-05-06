import React, { useState } from 'react';
import classes from './Login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="email" className={classes.label}>Email</label>
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
          <label htmlFor="password" className={classes.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
            required
          />
        </div>
        <button type="submit" className={classes.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;