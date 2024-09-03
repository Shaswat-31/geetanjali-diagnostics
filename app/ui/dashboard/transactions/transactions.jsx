"use client";

import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, useDisclosure } from '@chakra-ui/react';
import { addPatient } from '@/app/lib/actions';
import dynamic from 'next/dynamic';

const DownDrop = dynamic(() => import("./DownDrop"), { ssr: false });

const AddPatientModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'F',
    tests: "",
    test2: '',
    testType: 'Regular',
    costTotal: '',
    transactionMode: 'Cash',
    doctorReferred: '',
    place: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert formData to FormData object
      const formDataObj = new FormData(e.target);
      await addPatient(formDataObj);
      onClose();
    } catch (error) {
      console.error('Failed to add patient:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center cursor-pointer bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={onOpen}
      >
        <h1 className="text-xl font-semibold">Add Patient</h1>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <div className="flex justify-center items-center h-24">
                <Spinner size="lg" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="age" isRequired mt={4}>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="sex" isRequired mt={4}>
                  <FormLabel>Sex</FormLabel>
                  <Select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                  >
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </Select>
                </FormControl>
                <FormControl id="tests" isRequired mt={4}>
                  <FormLabel>Test</FormLabel>
                  <DownDrop options={data} />
                </FormControl>
                <FormControl id="testType" isRequired mt={4}>
                  <FormLabel>Test Type</FormLabel>
                  <Select
                    name="testType"
                    value={formData.testType}
                    onChange={handleChange}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Night">Night</option>
                    <option value="Wholesale">Wholesale</option>
                  </Select>
                </FormControl>
                <FormControl id="costTotal" isRequired mt={4}>
                  <FormLabel>Cost Total</FormLabel>
                  <Input
                    type="number"
                    name="costTotal"
                    value={formData.costTotal}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="transactionMode" isRequired mt={4}>
                  <FormLabel>Transaction Mode</FormLabel>
                  <Select
                    name="transactionMode"
                    value={formData.transactionMode}
                    onChange={handleChange}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </Select>
                </FormControl>
                <FormControl id="doctorReferred" isRequired mt={4}>
                  <FormLabel>Doctor Referred</FormLabel>
                  <Input
                    type="text"
                    name="doctorReferred"
                    value={formData.doctorReferred}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="place" isRequired mt={4}>
                  <FormLabel>Place</FormLabel>
                  <Input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mt={4}
                  width="full"
                >
                  Submit
                </Button>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPatientModal;
