// patients/page.jsx

import { deletePatient } from "@/app/lib/actions";
import { fetchPatients } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/patients/patients.module.css";
import Link from "next/link";
import { auth } from "@/app/auth";

const PatientsPage = async ({ searchParams }) => {
  const { user } = await auth();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, patients } = await fetchPatients(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a patient..." />
          <Link href="/dashboard/patients/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Age/Sex</td>
            <td>Date</td>
            <td>Tests</td>
            <td>Cost Total</td>
            <td>Transaction Mode</td>
            <td>Doctor Referred</td>
            <td>Place</td>
            <td>Added By</td>
            {
              user.isAdmin && 
              <td>Action</td>
            }
           
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.ageSex}</td>
              <td>{new Date(patient.date).toDateString()}</td>
              <td>{patient.tests}</td>
              <td>{patient.costTotal}</td>
              <td>{patient.transactionMode}</td>
              <td>{patient.doctorReferred}</td>
              <td>{patient.place}</td>
              <td>
                {patient.addedBy}
              </td>
              <td>
              {user.isAdmin && (
                <div className={styles.buttons}>
                  <Link href={`/dashboard/patients/${patient.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                    <form action={deletePatient}>
                      <input type="hidden" name="id" value={patient.id} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form>
                </div>
                 )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default PatientsPage;
