import React from 'react';
import { Box, Text, Stack, Badge } from '@chakra-ui/react';

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
}

const EmployeeGridItem: React.FC<Props> = ({ employee }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
      <Stack spacing={2}>
        <Text fontWeight="bold">{employee.name}</Text>
        <Text>Age: {employee.age}</Text>
        <Text>Class: {employee.class}</Text>
        <Text>Attendance: {employee.attendance}%</Text>
        <Stack direction="row" wrap="wrap">
          {employee.subjects.map((subj, i) => (
            <Badge key={i} colorScheme="purple">{subj}</Badge>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmployeeGridItem;
