import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Box, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classes from './IssueForm.module.css';
import '@mantine/notifications/styles.css';

const IssueForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate

  interface FormValues {
    title: string;
    description: string;
    priority: string;
    author: string;
    status: string; // Add status field
  }

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      description: '',
      priority: '',
      author: '',
      status: 'pending', // Add default status
    },
    validate: {
      title: (value: string) =>
        value.trim().length === 0 ? 'Title is required' : null,
      description: (value: string) =>
        value.trim().length === 0 ? 'Description is required' : null,
      priority: (value: string) =>
        value.trim().length === 0 ? 'Priority is required' : null,
      author: (value: string) =>
        value.trim().length === 0 ? 'Author is required' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const id = notifications.show({
      loading: true,
      title: 'Submitting your issue',
      message: 'Please wait while we process your request...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const response = await fetch('http://localhost:3000/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          priority: values.priority,
          status: values.status, // Ensure status is included
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create issue');
      }

      const data = await response.json();
      console.log('Issue created:', data);

      notifications.update({
        id,
        color: 'teal',
        title: 'Issue Created',
        message: 'Your issue has been successfully created!',
        icon: <IconCheck size={18} />,
        loading: false,
        autoClose: 2000,
      });

      form.reset();
      form.setFieldValue('priority', ''); // Reset priority field to null
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error creating issue:', error);

      notifications.update({
        id,
        color: 'red',
        title: 'Submission Failed',
        message: 'There was an error creating your issue. Please try again.',
        icon: <IconX size={18} />,
        loading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <Box className={classes.container}>
      <h1 className={classes.title}>Report An Issue</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter issue title"
          {...form.getInputProps('title')}
          className={classes.input}
        />
        <TextInput
          label="Author"
          placeholder="Enter author name"
          {...form.getInputProps('author')}
          className={classes.input}
        />
        <Select
          className={classes.input}
          label="Priority"
          placeholder="Select priority"
          data={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          {...form.getInputProps('priority')}
        />
        <Textarea
          label="Description"
          placeholder="Enter issue description"
          {...form.getInputProps('description')}
          className={classes.input}
          minRows={5}
        />
        <Button type="submit" className={classes.button} fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
