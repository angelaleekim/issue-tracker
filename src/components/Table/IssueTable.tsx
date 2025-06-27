import React, { useState, useEffect } from 'react';
import {
  Table,
  Badge,
  Pagination,
  Select,
  Menu,
  ActionIcon,
  Modal,
  Button,
  Loader,
  SegmentedControl,
} from '@mantine/core';
import { IconDots, IconTrash, IconCheck, IconX } from '@tabler/icons-react'; // Import icons
import { notifications } from '@mantine/notifications';
import classes from './IssueTable.module.css';
import { PRIORITY_COLORS, Priority } from '../../constants';
import { useDisclosure } from '@mantine/hooks';

interface Issue {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  author: string;
  status: string;
  createdAt: string; // Add createdAt field
}

const IssueTable: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState('pending'); // Add state for selected status
  const [sortBy, setSortBy] = useState<keyof Issue | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  // const [checkingAuth, setCheckingAuth] = useState(true); // Add state to check authentication

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     window.location.href = '/login'; // Redirect unauthenticated users to the login page
  //   } else {
  //     setCheckingAuth(false); // Allow rendering if authenticated
  //   }
  // }, []);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch(
        'https://issue-tracker-m82y.onrender.com/api/issues'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const data = await response.json();
      setIssues(
        data
          .map((issue: Issue) => ({
            ...issue,
            priority: issue.priority.toUpperCase(), // Convert to uppercase (e.g., 'LOW', 'MEDIUM', 'HIGH')
          }))
          .sort(
            (a: Issue, b: Issue) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) // Sort by newest first
      );
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://issue-tracker-m82y.onrender.com/api/issues/${id}`,
        {
          method: 'DELETE',
        }
      );

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

    setIssues((prevIssues) =>
      [...prevIssues].sort((a, b) => {
        if (field === 'priority') {
          const priorityOrder = ['low', 'medium', 'high'];
          const comparison =
            priorityOrder.indexOf(a.priority.toLowerCase()) -
            priorityOrder.indexOf(b.priority.toLowerCase());
          return sortDirection === 'asc' ? comparison : -comparison;
        } else {
          const comparison = a[field].localeCompare(b[field]);
          return sortDirection === 'asc' ? comparison : -comparison;
        }
      })
    );
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(
        `https://issue-tracker-m82y.onrender.com/api/issues/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedIssue = await response.json();
      setIssues((prevIssues) => {
        const updatedIssues = prevIssues.filter((issue) => issue._id !== id);
        return [
          { ...updatedIssue, priority: updatedIssue.priority.toUpperCase() },
          ...updatedIssues,
        ].sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
        ); // Sort by newest first
      });

      setSelectedStatus(newStatus); // Show the section of the updated status

      notifications.show({
        color: 'teal',
        title: 'Status Updated',
        message: `The issue status has been updated to ${newStatus.replace(
          '_',
          ' '
        )}.`,
        icon: <IconCheck size={18} />,
      });

      close(); // Close the modal after updating the status
    } catch (error) {
      console.error('Error updating status:', error);
      notifications.show({
        color: 'red',
        title: 'Update Failed',
        message:
          'There was an error updating the issue status. Please try again.',
        icon: <IconX size={18} />,
      });
    }
  };

  const filteredIssues = issues.filter(
    (issue) => issue.status === selectedStatus
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIssues = filteredIssues.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const rows = paginatedIssues.map((issue) => (
    <Table.Tr
      key={issue._id}
      className={classes.tableRow}
      onClick={() => {
        setSelectedIssue(issue);
        open();
      }}
      style={{ cursor: 'pointer' }} // Add pointer cursor
    >
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.author}</Table.Td>
      <Table.Td>{issue.description}</Table.Td>
      <Table.Td>
        <Badge color={PRIORITY_COLORS[issue.priority]}>{issue.priority}</Badge>
      </Table.Td>
      <Table.Td>
        <Menu>
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="default"
              onClick={(e) => e.stopPropagation()} // Prevent modal from opening
            >
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconTrash size={16} />}
              color="red"
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click from triggering
                handleDelete(issue._id);
              }}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20vh',
        }}
      >
        <Loader variant="dots" />
      </div>
    );
  }

  if (issues.length === 0) {
    return null; // Show nothing if there are no issues
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <SegmentedControl
          fullWidth
          withItemsBorders={false}
          value={selectedStatus}
          onChange={setSelectedStatus}
          data={[
            { label: 'Pending', value: 'pending' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Resolved', value: 'resolved' }, // Change "Complete" to "Resolved"
          ]}
          className={classes.segmentedControl}
        />
      </div>
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
            <Table.Th className={classes.headerCell}>Description</Table.Th>
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
      <Modal opened={opened} onClose={close} title="Issue Details" centered>
        {selectedIssue && (
          <div>
            <p>
              <strong>Title:</strong> {selectedIssue.title}
            </p>
            <p>
              <strong>Author:</strong> {selectedIssue.author}
            </p>
            <p>
              <strong>Description:</strong> {selectedIssue.description}
            </p>
            <p>
              <strong>Priority:</strong>{' '}
              {selectedIssue.priority.charAt(0).toUpperCase() +
                selectedIssue.priority.slice(1).toLowerCase()}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {selectedIssue.status.charAt(0).toUpperCase() +
                selectedIssue.status
                  .slice(1)
                  .replace('_', ' ')
                  .replace('progress', 'Progress')}
            </p>
            {selectedIssue.status === 'pending' && (
              <>
                <Button
                  onClick={() =>
                    handleUpdateStatus(selectedIssue._id, 'in_progress')
                  }
                  color="blue"
                  style={{ marginRight: '10px' }}
                >
                  Mark as In Progress
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateStatus(selectedIssue._id, 'resolved')
                  }
                  color="green"
                >
                  Mark as Resolved
                </Button>
              </>
            )}
            {selectedIssue.status === 'in_progress' && (
              <Button
                onClick={() =>
                  handleUpdateStatus(selectedIssue._id, 'resolved')
                }
                color="green"
              >
                Mark as Resolved
              </Button>
            )}
          </div>
        )}
      </Modal>
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
          total={Math.ceil(filteredIssues.length / itemsPerPage)}
          value={currentPage}
          onChange={setCurrentPage}
          className={classes.pagination}
        />
      </div>
    </div>
  );
};

export default IssueTable;
