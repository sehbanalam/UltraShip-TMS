import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      username
      role
    }
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const toast = useToast();
  const navigate = useNavigate();

  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email, password }
      });

      localStorage.setItem('token', data.loginUser.token);
      localStorage.setItem('role', data.loginUser.role);
      toast({ title: 'Login successful', status: 'success' });
      navigate('/dashboard');
    } catch (err: unknown) {
      let message = 'An unknown error occurred';
      if (err instanceof Error) {
        message = err.message;
      }
      toast({
        title: 'Login failed',
        description: message,
        status: 'error'
      });
    }
  };

  return (
    <Box p={{ base: 4, md: 6 }} maxW="7xl" mx="auto">
      <Flex minH="100vh" align="center" justify="center" bg={pageBg} px={4}>
        <Box
          bg={boxBg}
          p={{ base: 6, md: 8 }}
          rounded="lg"
          shadow="md"
          width="full"
          maxW="md"
        >
          <Heading mb={6} textAlign="center" size="lg" color={textColor}>
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={textColor}>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                isLoading={loading}
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
