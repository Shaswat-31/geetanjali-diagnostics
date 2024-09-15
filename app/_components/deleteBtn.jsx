"use client";

import React, { useState } from 'react';
import styles from '@/app/ui/dashboard/patients/patients.module.css';
import { deletePatient, deleteTest, deleteUser } from '../lib/actions';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';

function DeleteBtn({ id, comp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    try {
      if (comp === "Test") await deleteTest(id);
      else if (comp === "Patient") await deletePatient(id);
      else await deleteUser(id);

      onClose(); // Close the dialog after deletion
    } catch (err) {
      console.error(`Failed to delete ${comp}:`, err);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className={`${styles.button} ${styles.delete}`}
      >
        Delete
      </button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {comp}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={handleDelete}
                isLoading={isLoading} // Button loading state
                ml={3}
              >
               {isLoading ? <Spinner size="sm" /> : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteBtn;
