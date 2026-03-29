import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Container,
  Divider,
  Stack,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
  SmartToy as ChatbotIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { PageContainer } from '../../styles/globalStyles';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'About', path: '/about', icon: <PersonIcon /> },
    { text: 'Resume', path: '/resume', icon: <WorkIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactIcon /> },
    { text: 'Chatbot', path: '/chatbot', icon: <ChatbotIcon /> },
  ];

  const appTitle = 'Alex Carter';
  const appTagline = 'Software Engineer';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', p: 2 }}>
      <Stack spacing={1.5} sx={{ mb: 2, mt: 1 }}>
        <Typography variant="h6" noWrap component="div">
          {appTitle}
        </Typography>
        <Chip size="small" color="primary" label={appTagline} sx={{ width: 'fit-content' }} />
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(37, 99, 235, 0.12)',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <PageContainer>
      <AppBar position="sticky" elevation={0} sx={{ top: 14, mx: 'auto', width: 'calc(100% - 32px)', maxWidth: '1240px', borderRadius: 3 }}>
        <Toolbar sx={{ minHeight: 72 }}>
          <Container maxWidth={false} disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1.5, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ cursor: 'pointer', flexGrow: 1 }} onClick={() => navigate('/')}>
              <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                {appTitle}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {appTagline}
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.75 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    px: 1.6,
                    py: 0.8,
                    borderRadius: 2.5,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    backgroundColor: location.pathname === item.path ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.12)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box component="footer" sx={{ px: 3, pb: 3 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              borderRadius: 3,
              py: 2,
              px: 2.5,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {appTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Built with React + Material UI
            </Typography>
          </Box>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default Layout;
