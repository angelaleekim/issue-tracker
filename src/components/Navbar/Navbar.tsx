import React, { useState } from 'react';
import { Drawer, ActionIcon, NavLink } from '@mantine/core';
import { IconBug, IconMenu2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Trackr"
        padding="sm"
        size="sm"
        classNames={{ title: classes.drawerTitle }}
      >
        <NavLink
          label={
            <div className={classes.navLinkLabel}>
              <IconBug size={16} className={classes.icon} />
              <Link to="/issue-form" className={classes.link}>
                Report an Issue
              </Link>
            </div>
          }
        />
      </Drawer>
      <ActionIcon
        onClick={() => setOpened(true)}
        className={classes.actionIcon}
        size="lg"
        variant="subtle"
      >
        <IconMenu2 size={24} />
      </ActionIcon>
    </>
  );
};

export default Navbar;
