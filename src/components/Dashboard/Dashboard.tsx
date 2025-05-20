import React, { useEffect, useState } from 'react';
import IssueTable from '../Table/IssueTable';
import { MantineProvider, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Redirect unauthenticated users to the login page
    }

    // Simulate fetching issues
    setTimeout(() => setLoading(false), 1000); // Replace with actual fetch logic
  }, []);

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
