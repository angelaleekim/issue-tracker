// import React, { useEffect, useState } from 'react';
import IssueTable from '../Table/IssueTable';
import {
  MantineProvider,
  Button,
  Switch,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  // const [checkingAuth, setCheckingAuth] = useState(true); // Add state to check authentication
  const { colorScheme, toggleColorScheme } = useMantineColorScheme(); // Use Mantine's color scheme hook

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     window.location.href = '/login'; // Redirect unauthenticated users to the login page
  //   } else {
  //     setCheckingAuth(false); // Allow rendering if authenticated
  //   }
  // }, []);

  // if (checkingAuth) {
  //   return null; // Prevent rendering until authentication check is complete
  // }

  return (
    <MantineProvider>
      <div className={classes.container}>
        <div className={classes.content}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <Button
              onClick={() => navigate('/issue-form')} // Navigate to issue form
              color="blue"
            >
              + New Issue
            </Button>
            <Switch
              size="md"
              onLabel={<IconSun size={16} stroke={2.5} />}
              offLabel={<IconMoon size={16} stroke={2.5} />}
              checked={colorScheme === 'dark'}
              onChange={() => toggleColorScheme()}
              style={{ cursor: 'pointer' }} // Add cursor pointer
            />
          </div>
          <h1>Issue Dashboard</h1>
          <IssueTable />
        </div>
      </div>
    </MantineProvider>
  );
};

export default Dashboard;
