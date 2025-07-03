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
  useToast
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

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
              <Input name="name" value={form.name} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input name="age" type="number" value={form.age} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Class</FormLabel>
              <Input name="class" value={form.class} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Subjects</FormLabel>
              <Input name="subjects" value={form.subjects} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Attendance (%)</FormLabel>
              <Input name="attendance" type="number" value={form.attendance} onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} isLoading={loading} colorScheme="teal">
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEmployeeModal;
