"use client"
import React from 'react';
import styles from '@/app/ui/dashboard/patients/patients.module.css';

function DeleteBtn({ action }) {
  return (
    <form onSubmit={action}>
      <button
        type="submit"
        className={`${styles.button} ${styles.delete}`}
      >
        Delete
      </button>
    </form>
  );
}

export default DeleteBtn;
