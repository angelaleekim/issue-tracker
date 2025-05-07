import React from 'react';
import { Table, Badge } from '@mantine/core';
import classes from './IssueTable.module.css';
import { PRIORITY_COLORS, Priority } from '../../constants';

const IssueTable: React.FC = () => {
  const data: {
    id: number;
    title: string;
    author: string;
    description: string;
    priority: Priority;
  }[] = [
    {
      id: 1,
      title: 'Fix login bug',
      author: 'John Doe',
      description: 'Users cannot log in with valid credentials.',
      priority: 'HIGH',
    },
    {
      id: 2,
      title: 'Update dashboard UI',
      author: 'Jane Smith',
      description: 'Redesign the dashboard for better usability.',
      priority: 'MEDIUM',
    },
    {
      id: 3,
      title: 'Add dark mode',
      author: 'Alice Johnson',
      description: 'Implement dark mode for the application.',
      priority: 'LOW',
    },
  ];

  const rows = data.map((issue) => (
    <Table.Tr key={issue.id} className={classes.tableRow}>
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.author}</Table.Td>
      <Table.Td>{issue.description}</Table.Td>
      <Table.Td>
        <Badge color={PRIORITY_COLORS[issue.priority]}>{issue.priority}</Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover={true} className={classes.table}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={classes.headerCell}>Title</Table.Th>
          <Table.Th className={classes.headerCell}>Author</Table.Th>
          <Table.Th className={classes.headerCell}>Description</Table.Th>
          <Table.Th className={classes.headerCell}>Priority</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default IssueTable;
