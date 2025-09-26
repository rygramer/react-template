import { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Box,
  useTheme,
  Tooltip
} from '@mui/material';
import { Inbox, Mail, ChevronLeft } from '@mui/icons-material';

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
}

export interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const menuGroups = [
  {
    items: [
      { text: 'Inbox', icon: <Inbox /> },
      { text: 'Starred', icon: <Mail /> },
      { text: 'Send email', icon: <Inbox /> },
      { text: 'Drafts', icon: <Mail /> }
    ]
  },
  {
    items: [
      { text: 'All mail', icon: <Inbox /> },
      { text: 'Trash', icon: <Mail /> },
      { text: 'Spam', icon: <Inbox /> }
    ]
  }
];

function Navigation({ showText }: { showText: boolean }) {
  return (
    <nav>
      {menuGroups.map((group, groupIdx) => (
        <Fragment key={groupIdx}>
          <List>
            {group.items.map((item, itemIdx) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
              >
                <Tooltip title={showText ? '' : item.text} placement='right'>
                  <ListItemButton
                    sx={{
                      justifyContent: showText ? 'flex-start' : 'center',
                      minHeight: 48
                    }}
                    aria-labelledby={'menu-item-' + groupIdx + itemIdx}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        mr: showText ? 3 : 0
                      }}
                      aria-label={item.text + ' icon'}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {showText && (
                      <ListItemText
                        id={'menu-item-' + groupIdx + itemIdx}
                        primary={item.text}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          {groupIdx < menuGroups.length - 1 && <Divider />}
        </Fragment>
      ))}
    </nav>
  );
}

export default function Menu({ open, onClose }: MenuProps) {
  const theme = useTheme();
  return (
    <>
      <Drawer
        variant='permanent'
        open={!open}
        sx={{
          width: theme.spacing(7),
          flexShrink: 0
        }}
        slotProps={{
          paper: {
            sx: {
              width: theme.spacing(7),
              boxSizing: 'border-box',
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
              }),
              boxShadow: theme.shadows[4],
              position: 'fixed',
              top: theme.spacing(8),
              height: `calc(100vh - ${theme.spacing(8)})`,
              zIndex: theme.zIndex.drawer,
              overflowX: 'hidden',
              ...(open && { width: 0, marginLeft: `-${theme.spacing(7)}` }),
              [theme.breakpoints.down('sm')]: {
                width: theme.spacing(6),
                top: theme.spacing(7),
                height: `calc(100vh - ${theme.spacing(7)})`
              }
            }
          }
        }}
      >
        {!open && <Navigation showText={false} />}
      </Drawer>
      <Drawer
        anchor='left'
        open={open}
        onClose={onClose}
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: theme.zIndex.drawer }}
        slotProps={{
          paper: {
            component: (props) => (
              <Paper
                {...props}
                sx={{ borderRadius: 0 }}
                aria-label='expanded menu'
              />
            )
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 1
          }}
        >
          <IconButton onClick={onClose} aria-label='close menu'>
            <ChevronLeft />
          </IconButton>
        </Box>
        <Box sx={{ mb: 1, [theme.breakpoints.down('sm')]: { mb: 0 } }} />
        <Navigation showText={true} />
      </Drawer>
    </>
  );
}
