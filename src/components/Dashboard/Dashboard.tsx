import React from 'react';
import IssueTable from '../Table/IssueTable';
import { MantineProvider } from '@mantine/core';
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
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
