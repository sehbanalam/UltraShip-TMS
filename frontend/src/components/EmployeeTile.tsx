import React from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
  HStack,
  Badge,
  useDisclosure,
  useToast,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import {
  InfoIcon,
  AtSignIcon,
  SmallAddIcon,
  ViewIcon,
  EditIcon,
  DeleteIcon
} from '@chakra-ui/icons';
import { gql, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import EmployeeDetail from './EmployeeDetail';
import EditEmployeeModal from './EditEmployeeModal';

const MotionBox = motion(Box);

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

  const bg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const labelColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <>
      <MotionBox
        p={5}
        bg={bg}
        borderRadius="2xl"
        boxShadow="md"
        transition="all 0.2s"
        _hover={{ boxShadow: 'lg' }}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <Stack spacing={2}>
          <HStack>
            <Icon as={InfoIcon} color="teal.400" />
            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              {employee.name}
            </Text>
          </HStack>

          <HStack>
            <Icon as={AtSignIcon} color="gray.400" />
            <Text color={labelColor}>Class: {employee.class}</Text>
          </HStack>

          <HStack>
            <Icon as={SmallAddIcon} color="gray.400" />
            <Text color={labelColor}>Attendance: {employee.attendance}%</Text>
          </HStack>

          <HStack wrap="wrap">
            {employee.subjects.map((s, i) => (
              <Badge key={i} colorScheme="teal">
                {s}
              </Badge>
            ))}
          </HStack>

          <HStack justify="space-between" mt={2}>
            <Button
              size="sm"
              leftIcon={<ViewIcon />}
              onClick={openDetail}
              colorScheme="teal"
              variant="outline"
            >
              Details
            </Button>

            {role === 'admin' && (
              <HStack>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={openEdit}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  leftIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={handleDelete}
                  isLoading={deleting}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  leftIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </HStack>
            )}
          </HStack>
        </Stack>
      </MotionBox>

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
