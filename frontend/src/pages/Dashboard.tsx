import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Flex,
  useToast,
  Heading,
  useBreakpointValue
} from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import EmployeeTile from '../components/EmployeeTile';
import EmployeeGridItem from '../components/EmployeeGridItem';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { useDisclosure } from '@chakra-ui/react';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

const Dashboard: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES);
  const [view, setView] = useState<'grid' | 'tile'>('grid');
  const [role, setRole] = useState<'admin' | 'employee' | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Dynamically adjust number of columns based on screen and view type
  const columnCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: view === 'grid' ? 3 : 1,
  });

  useEffect(() => {
    const savedRole = localStorage.getItem('role') as 'admin' | 'employee';
    setRole(savedRole);
  }, []);

  if (loading) return <Box p={4}>Loading employees...</Box>;
  if (error) {
    toast({ title: 'Failed to load employees', status: 'error' });
    return null;
  }

  return (
    <Box p={4}>
      <Flex
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        mb={4}
      >
        <Heading size="md">Employees</Heading>
        <Flex gap={2} wrap="wrap">
          <Button onClick={() => setView(view === 'grid' ? 'tile' : 'grid')}>
            Switch to {view === 'grid' ? 'Tile' : 'Grid'} View
          </Button>
          {role === 'admin' && (
            <Button colorScheme="teal" onClick={onOpen}>
              + Add Employee
            </Button>
          )}
        </Flex>
      </Flex>

      <SimpleGrid columns={columnCount} spacing={4}>
        {data?.employees.map((emp: any) =>
          view === 'grid' ? (
            <EmployeeGridItem key={emp.id} employee={emp} role={role} />
          ) : (
            <EmployeeTile key={emp.id} employee={emp} role={role} />
          )
        )}
      </SimpleGrid>

      {role === 'admin' && (
        <AddEmployeeModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      )}
    </Box>
  );
};

export default Dashboard;
