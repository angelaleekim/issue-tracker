import React, { useEffect, useState } from 'react';
import IssueTable from '../Table/IssueTable';
import { MantineProvider, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [checkingAuth, setCheckingAuth] = useState(true); // Add state to check authentication

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Redirect unauthenticated users to the login page
    } else {
      setCheckingAuth(false); // Allow rendering if authenticated
    }
  }, []);

  if (checkingAuth) {
    return null; // Prevent rendering until authentication check is complete
  }

  return (
    <MantineProvider>
      <div className={classes.container}>
        <div className={classes.content}>
          <Button
            onClick={() => navigate('/issue-form')} // Navigate to issue form
            color="blue"
            style={{ marginBottom: '20px' }}
          >
            + New Issue
          </Button>
          <h1>Issue Dashboard</h1>
          <IssueTable />
        </div>
      </div>
    </MantineProvider>
  );
};

export default Dashboard;
