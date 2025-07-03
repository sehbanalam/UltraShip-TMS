import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, FormControl, FormLabel,
  useToast, VStack
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

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
              <Input name="name" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input name="age" type="number" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Class</FormLabel>
              <Input name="class" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Subjects (comma separated)</FormLabel>
              <Input name="subjects" onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Attendance (%)</FormLabel>
              <Input name="attendance" type="number" onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} isLoading={loading} colorScheme="teal">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
