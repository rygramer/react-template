import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { Route } from './+types/home';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Home' }, { name: 'description', content: 'Welcome home!' }];
}

export default function MiniDrawer() {
  const menuGroups = [
    {
      items: [
        { text: 'Inbox', icon: <InboxIcon /> },
        { text: 'Starred', icon: <MailIcon /> },
        { text: 'Send email', icon: <InboxIcon /> },
        { text: 'Drafts', icon: <MailIcon /> }
      ]
    },
    {
      items: [
        { text: 'All mail', icon: <InboxIcon /> },
        { text: 'Trash', icon: <MailIcon /> },
        { text: 'Spam', icon: <InboxIcon /> }
      ]
    }
  ];

  function Menu({ showText }: { showText: boolean }) {
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
                      aria-label={item.text}
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
                </ListItem>
              ))}
            </List>
            {groupIdx < menuGroups.length - 1 && <Divider />}
          </Fragment>
        ))}
      </nav>
    );
  }
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ marginRight: 5 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Hybrid Mini/Temporary Drawer
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Mini sidebar with transition animation, hidden when drawer is open */}
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
                top: theme.spacing(7),
                height: `calc(100vh - ${theme.spacing(7)})`
              }
            }
          }
        }}
      >
        {!open && <Menu showText={false} />}
      </Drawer>
      {/* Temporary drawer overlays content with icons and text */}
      <Drawer
        anchor='left'
        open={open}
        onClose={handleDrawerClose}
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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} aria-label='close menu'>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Menu showText={true} />
      </Drawer>
      {/* Main content, shifted right to accommodate mini sidebar */}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}
