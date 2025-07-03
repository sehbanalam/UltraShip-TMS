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
  Badge
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, InfoOutlineIcon, AtSignIcon, CalendarIcon, StarIcon } from '@chakra-ui/icons';

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <InfoOutlineIcon mr={2} color="blue.500" />
          {employee.name}'s Details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Text>
              <AtSignIcon mr={2} color="gray.500" />
              <strong>Age:</strong> {employee.age}
            </Text>
            <Text>
              <StarIcon mr={2} color="yellow.400" />
              <strong>Class:</strong> {employee.class}
            </Text>
            <Text>
              <CalendarIcon mr={2} color="green.400" />
              <strong>Attendance:</strong> {employee.attendance}%
            </Text>
            <Text>
              <InfoOutlineIcon mr={2} color="purple.400" />
              <strong>Subjects:</strong>
            </Text>
            <Stack direction="row" wrap="wrap">
              {employee.subjects.map((subj, i) => (
                <Badge key={i} colorScheme="blue">{subj}</Badge>
              ))}
            </Stack>
          </Stack>
        </ModalBody>

        {role === 'admin' && (
          <ModalFooter justifyContent="space-between">
            <Button leftIcon={<EditIcon />} colorScheme="yellow" onClick={onEdit}>
              Edit
            </Button>
            <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EmployeeDetail;
