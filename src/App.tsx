import '@mantine/core/styles.css';
import './global.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import IssueForm from './components/IssueForm/IssueForm';

export default function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issue-form" element={<IssueForm />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
