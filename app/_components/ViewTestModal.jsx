"use client";

import React from "react";
import { 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure, 
  Button 
} from "@chakra-ui/react";

function ViewTestModal({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const testArray=JSON.parse(data)
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>View Tests</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Test Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {testArray.map((item) => (
            <div>
              {item}
            </div>
          ))}
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
}

export default ViewTestModal;
