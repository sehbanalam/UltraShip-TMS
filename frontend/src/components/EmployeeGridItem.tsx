import React from 'react';
import {
  Box,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  Button,
  HStack,
  useDisclosure,
  Icon,
  useToast,
} from '@chakra-ui/react';
import {
  InfoIcon,
  CalendarIcon,
  AtSignIcon,
  SmallAddIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import EmployeeDetail from './EmployeeDetail';
import EditEmployeeModal from './EditEmployeeModal';
import { gql, useMutation } from '@apollo/client';

const MotionBox = motion(Box);

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

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

const EmployeeGridItem: React.FC<Props> = ({ employee, role, refetch }) => {
  const bg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');
  const toast = useToast();

  const detailModal = useDisclosure();
  const editModal = useDisclosure();

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const handleDelete = async () => {
    const confirm = window.confirm(`Delete employee "${employee.name}"?`);
    if (!confirm) return;

    try {
      await deleteEmployee({ variables: { id: employee.id } });
      toast({ title: 'Deleted successfully', status: 'success' });
      if (refetch) refetch();
      detailModal.onClose();
    } catch (err: any) {
      toast({ title: 'Delete failed', description: err.message, status: 'error' });
    }
  };

  return (
    <>
      <MotionBox
        p={5}
        bg={bg}
        borderRadius="2xl"
        boxShadow="md"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Stack spacing={3}>
          <HStack>
            <Icon as={InfoIcon} color="teal.400" />
            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              {employee.name}
            </Text>
          </HStack>

          <HStack>
            <Icon as={CalendarIcon} color="gray.400" />
            <Text color={subtitleColor}>Age: {employee.age}</Text>
          </HStack>

          <HStack>
            <Icon as={AtSignIcon} color="gray.400" />
            <Text color={subtitleColor}>Class: {employee.class}</Text>
          </HStack>

          <HStack>
            <Icon as={SmallAddIcon} color="gray.400" />
            <Text color={subtitleColor}>Attendance: {employee.attendance}%</Text>
          </HStack>

          <Stack direction="row" wrap="wrap">
            {employee.subjects.map((subj, i) => (
              <Badge key={i} colorScheme="purple">
                {subj}
              </Badge>
            ))}
          </Stack>

          <HStack justify="flex-end" pt={2}>
            <Button
              size="sm"
              leftIcon={<ViewIcon />}
              onClick={detailModal.onOpen}
              colorScheme="teal"
              variant="outline"
            >
              Details
            </Button>
          </HStack>
        </Stack>
      </MotionBox>

      {/* Detail Modal */}
      <EmployeeDetail
        isOpen={detailModal.isOpen}
        onClose={detailModal.onClose}
        employee={employee}
        role={role}
        onEdit={() => {
          detailModal.onClose();
          editModal.onOpen();
        }}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      <EditEmployeeModal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        employee={employee}
        refetch={refetch}
      />
    </>
  );
};

export default EmployeeGridItem;
