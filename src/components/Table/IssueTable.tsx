import React, { useState, useEffect } from 'react';
import {
  Table,
  Badge,
  Pagination,
  Select,
  Menu,
  ActionIcon,
} from '@mantine/core';
import { IconDots, IconTrash, IconCheck, IconX } from '@tabler/icons-react'; // Import icons
import { notifications } from '@mantine/notifications';
import classes from './IssueTable.module.css';
import { PRIORITY_COLORS, Priority } from '../../constants';

interface Issue {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  author: string;
}

const IssueTable: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<keyof Issue | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchIssues = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/issues');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const data = await response.json();
      setIssues(
        data.map((issue: Issue) => ({
          ...issue,
          priority: issue.priority.toUpperCase(), // Ensure consistent casing
        }))
      );
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/issues/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete issue');
      }

      setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== id));
      notifications.show({
        color: 'teal',
        title: 'Issue Deleted',
        message: 'The issue has been successfully deleted.',
        icon: <IconCheck size={18} />,
      });
    } catch (error) {
      console.error('Error deleting issue:', error);
      notifications.show({
        color: 'red',
        title: 'Deletion Failed',
        message: 'There was an error deleting the issue. Please try again.',
        icon: <IconX size={18} />,
      });
    }
  };

  const handleSort = (field: keyof Issue) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const PRIORITY_ORDER = ['LOW', 'MEDIUM', 'HIGH'];

  const sortedIssues = [...issues].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === 'priority') {
      const aIndex = PRIORITY_ORDER.indexOf(a.priority);
      const bIndex = PRIORITY_ORDER.indexOf(b.priority);
      return sortDirection === 'asc' ? aIndex - bIndex : bIndex - aIndex;
    }

    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIssues = sortedIssues.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const rows = paginatedIssues.map((issue) => (
    <Table.Tr key={issue._id} className={classes.tableRow}>
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.author}</Table.Td>
      <Table.Td>{issue.description}</Table.Td>
      <Table.Td>
        <Badge color={PRIORITY_COLORS[issue.priority]}>{issue.priority}</Badge>
      </Table.Td>
      <Table.Td>
        <Menu>
          <Menu.Target>
            <ActionIcon variant="subtle" color="black">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={() => handleDelete(issue._id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table highlightOnHover={true} className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              className={classes.headerCell}
              onClick={() => handleSort('title')}
            >
              Title{' '}
              {sortBy === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th
              className={classes.headerCell}
              onClick={() => handleSort('author')}
            >
              Author{' '}
              {sortBy === 'author' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th className={classes.headerCell}>Description </Table.Th>
            <Table.Th
              className={classes.headerCell}
              onClick={() => handleSort('priority')}
            >
              Priority{' '}
              {sortBy === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
            </Table.Th>
            <Table.Th className={classes.headerCell}></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <div className={classes.paginationContainer}>
        <Select
          label="Items per page"
          placeholder="Select"
          data={[
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '20', label: '20' },
          ]}
          value={itemsPerPage.toString()}
          onChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1); // Reset to the first page
          }}
          className={classes.select}
        />
        <Pagination
          total={Math.ceil(issues.length / itemsPerPage)}
          value={currentPage}
          onChange={setCurrentPage}
          className={classes.pagination}
        />
      </div>
    </div>
  );
};

export default IssueTable;
