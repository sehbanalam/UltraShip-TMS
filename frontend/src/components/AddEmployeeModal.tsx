import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, FormControl, FormLabel,
  useToast, VStack, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import {
  AtSignIcon,
  CalendarIcon,
  StarIcon,
  SmallAddIcon,
  EditIcon
} from '@chakra-ui/icons';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $age: Int!, $class: String, $subjects: [String!], $attendance: Float) {
    addEmployee(name: $name, age: $age, class: $class, subjects: $subjects, attendance: $attendance) {
      id
      name
    }
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AddEmployeeModal: React.FC<Props> = ({ isOpen, onClose, refetch }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    age: '',
    class: '',
    subjects: '',
    attendance: ''
  });

  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addEmployee({
        variables: {
          name: form.name,
          age: parseInt(form.age),
          class: form.class,
          subjects: form.subjects.split(',').map((s) => s.trim()),
          attendance: parseFloat(form.attendance)
        }
      });
      toast({ title: 'Employee added', status: 'success' });
      onClose();
      refetch();
    } catch (err: any) {
      toast({ title: 'Failed to add employee', description: err.message, status: 'error' });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EditIcon color="gray.400" />
                </InputLeftElement>
                <Input name="name" onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <CalendarIcon color="gray.400" />
                </InputLeftElement>
                <Input name="age" type="number" onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Class</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <StarIcon color="gray.400" />
                </InputLeftElement>
                <Input name="class" onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Subjects (comma separated)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.400" />
                </InputLeftElement>
                <Input name="subjects" onChange={handleChange} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Attendance (%)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SmallAddIcon color="gray.400" />
                </InputLeftElement>
                <Input name="attendance" type="number" onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            colorScheme="teal"
            leftIcon={<SmallAddIcon />}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
