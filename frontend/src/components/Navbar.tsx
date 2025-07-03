import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  HStack,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Employees', to: '/dashboard#employees' },
    { label: 'Reports', to: '/dashboard#reports' },
    { label: 'Settings', to: '/dashboard#settings' },
  ];

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        px={4}
        py={3}
        boxShadow="sm"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Flex align="center">
          <Heading size="md" color={useColorModeValue('teal.600', 'teal.300')}>
            UltraShip
          </Heading>

          <Spacer />

          {/* Desktop menu */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                as={RouterLink}
                to={item.to}
                variant="ghost"
                colorScheme="teal"
                fontWeight="medium"
                isDisabled={item.label === 'Reports' || item.label === 'Settings'} // Disable Reports & Settings
              >
                {item.label}
              </Button>
            ))}
            <Button onClick={handleLogout} variant="outline" colorScheme="red">
              Logout
            </Button>
            <ThemeToggle />
          </HStack>

          {/* Mobile hamburger */}
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            ml={2}
          />
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  as={RouterLink}
                  to={item.to}
                  onClick={onClose}
                  variant="ghost"
                  isDisabled={item.label === 'Reports' || item.label === 'Settings'} // Disable Reports & Settings
                >
                  {item.label}
                </Button>
              ))}
              <Button onClick={handleLogout} colorScheme="red" variant="outline">
                Logout
              </Button>
              <ThemeToggle />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
