import React, { useEffect } from 'react';
import IssueTable from '../Table/IssueTable';
import { MantineProvider } from '@mantine/core';
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Redirect unauthenticated users to the login page
    }
  }, []);

  return (
    <MantineProvider>
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Issue Dashboard</h1>
          <IssueTable />
        </div>
      </div>
    </MantineProvider>
  );
};

export default Dashboard;
