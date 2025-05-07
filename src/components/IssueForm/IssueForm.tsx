import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Box, Select } from '@mantine/core';
import classes from './IssueForm.module.css';

const IssueForm: React.FC = () => {
  interface FormValues {
    title: string;
    description: string;
    priority: string;
  }

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      description: '',
      priority: '',
    },
    validate: {
      title: (value: string) =>
        value.trim().length === 0 ? 'Title is required' : null,
      description: (value: string) =>
        value.trim().length === 0 ? 'Description is required' : null,
      priority: (value: string) =>
        value.trim().length === 0 ? 'Priority is required' : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Form submitted:', values);
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
        <Select
          label="Priority"
          placeholder="Select priority"
          data={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          {...form.getInputProps('priority')}
          className={classes.input}
        />
        <Textarea
          label="Description"
          placeholder="Enter issue description"
          {...form.getInputProps('description')}
          className={classes.input}
          minRows={4}
        />
        <Button type="submit" className={classes.button} fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
