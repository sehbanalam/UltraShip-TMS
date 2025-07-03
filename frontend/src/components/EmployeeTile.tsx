import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
  HStack,
  Badge,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import EmployeeDetail from './EmployeeDetail';
import EditEmployeeModal from './EditEmployeeModal';

interface Props {
  employee: {
    id: string;
    name: string;
    age: number;
    class: string;
    subjects: string[];
    attendance: number;
  };
  role: 'admin' | 'employee' | null;
  refetch?: () => void;
}

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const EmployeeTile: React.FC<Props> = ({ employee, role, refetch }) => {
  const toast = useToast();

  const {
    isOpen: isDetailOpen,
    onOpen: openDetail,
    onClose: closeDetail
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: openEdit,
    onClose: closeEdit
  } = useDisclosure();

  const [deleteEmployee, { loading: deleting }] = useMutation(DELETE_EMPLOYEE);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete employee "${employee.name}"?`);
    if (!confirmed) return;

    try {
      await deleteEmployee({ variables: { id: employee.id } });
      toast({ title: 'Employee deleted', status: 'success' });
      if (refetch) refetch();
    } catch (err: any) {
      toast({ title: 'Delete failed', description: err.message, status: 'error' });
    }
  };

  return (
    <>
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm" bg="gray.50">
        <Stack spacing={2}>
          <Text fontWeight="bold">{employee.name}</Text>
          <Text>Class: {employee.class}</Text>
          <HStack wrap="wrap">
            {employee.subjects.map((s, i) => (
              <Badge key={i} colorScheme="teal">{s}</Badge>
            ))}
          </HStack>

          <HStack justify="space-between" mt={2}>
            <Button size="sm" onClick={openDetail}>Details</Button>

            {role === 'admin' && (
              <HStack>
                <Button size="sm" colorScheme="yellow" onClick={openEdit}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={handleDelete}
                  isLoading={deleting}
                >
                  Delete
                </Button>
              </HStack>
            )}
          </HStack>
        </Stack>
      </Box>

      <EmployeeDetail
        isOpen={isDetailOpen}
        onClose={closeDetail}
        employee={employee}
        role={role}
        onEdit={() => {
          closeDetail();
          openEdit();
        }}
        onDelete={handleDelete}
      />

      {role === 'admin' && (
        <EditEmployeeModal
          isOpen={isEditOpen}
          onClose={closeEdit}
          employee={employee}
          refetch={refetch || (() => {})}
        />
      )}
    </>
  );
};

export default EmployeeTile;
