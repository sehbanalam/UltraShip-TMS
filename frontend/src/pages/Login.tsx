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
  Flex
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
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        rounded="lg"
        shadow="md"
        width="full"
        maxW="md"
      >
        <Heading mb={6} textAlign="center" size="lg">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
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
  );
};

export default Login;
