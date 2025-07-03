import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Text,
  Badge,
  useToast
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: string;
    name: string;
    age: number;
    class: string;
    subjects: string[];
    attendance: number;
  };
  role: 'admin' | 'employee' | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EmployeeDetail: React.FC<Props> = ({
  isOpen,
  onClose,
  employee,
  role,
  onEdit,
  onDelete
}) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{employee.name}'s Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Text><strong>Age:</strong> {employee.age}</Text>
            <Text><strong>Class:</strong> {employee.class}</Text>
            <Text><strong>Attendance:</strong> {employee.attendance}%</Text>
            <Text><strong>Subjects:</strong></Text>
            <Stack direction="row" wrap="wrap">
              {employee.subjects.map((subj, i) => (
                <Badge key={i} colorScheme="blue">{subj}</Badge>
              ))}
            </Stack>
          </Stack>
        </ModalBody>

        {role === 'admin' && (
          <ModalFooter justifyContent="space-between">
            <Button colorScheme="yellow" onClick={onEdit}>Edit</Button>
            <Button colorScheme="red" onClick={onDelete}>Delete</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EmployeeDetail;
