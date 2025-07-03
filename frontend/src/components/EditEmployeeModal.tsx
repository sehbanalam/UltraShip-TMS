import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import {
  AtSignIcon,
  CalendarIcon,
  StarIcon,
  SmallAddIcon,
  EditIcon
} from '@chakra-ui/icons';

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $age: Int
    $class: String
    $subjects: [String!]
    $attendance: Float
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      class: $class
      subjects: $subjects
      attendance: $attendance
    ) {
      id
      name
    }
  }
`;

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
  refetch: () => void;
}

const EditEmployeeModal: React.FC<Props> = ({ isOpen, onClose, employee, refetch }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    age: '',
    class: '',
    subjects: '',
    attendance: ''
  });

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        age: String(employee.age),
        class: employee.class,
        subjects: employee.subjects.join(', '),
        attendance: String(employee.attendance)
      });
    }
  }, [employee]);

  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateEmployee({
        variables: {
          id: employee.id,
          name: form.name,
          age: parseInt(form.age),
          class: form.class,
          subjects: form.subjects.split(',').map((s) => s.trim()),
          attendance: parseFloat(form.attendance)
        }
      });
      toast({ title: 'Employee updated', status: 'success' });
      onClose();
      refetch();
    } catch (err: any) {
      toast({ title: 'Update failed', description: err.message, status: 'error' });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EditIcon color="gray.400" />
                </InputLeftElement>
                <Input name="name" value={form.name} onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CalendarIcon color="gray.400" />
                </InputLeftElement>
                <Input name="age" type="number" value={form.age} onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Class</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <StarIcon color="gray.400" />
                </InputLeftElement>
                <Input name="class" value={form.class} onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Subjects</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.400" />
                </InputLeftElement>
                <Input name="subjects" value={form.subjects} onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Attendance (%)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SmallAddIcon color="gray.400" />
                </InputLeftElement>
                <Input name="attendance" type="number" value={form.attendance} onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            colorScheme="teal"
            leftIcon={<EditIcon />} // Add icon to Save Changes button
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployeeModal;
