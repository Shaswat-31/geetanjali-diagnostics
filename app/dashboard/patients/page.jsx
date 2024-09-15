import { deletePatient } from "@/app/lib/actions";
import { fetchPatients, fetchTests, getPatientsByDate } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/patients/patients.module.css";
import Link from "next/link";
import { auth } from "@/app/auth";
import DateRangeForm from "@/app/_components/datePicker";
import { getEndOfMonth, getStartOfMonth } from "@/app/lib/dateUtils";
import DeleteBtn from "@/app/_components/deleteBtn";
import dynamic from "next/dynamic";
import { Button } from "@chakra-ui/react";
import AddPatientModal from "@/app/ui/dashboard/transactions/transactions";

// Dynamically import the ViewTestModal to enable client-side rendering
const ViewTestModal = dynamic(() => import("@/app/_components/ViewTestModal"), { ssr: false });

const PatientsPage = async ({ searchParams }) => {
  const { user } = await auth();
  const {tests}=await fetchTests();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, patients } = await fetchPatients(q, page);
  const monthStart = getStartOfMonth();
  const monthEnd = getEndOfMonth();
  const startDateParam = searchParams?.startDate || monthStart;
  const endDateParam = searchParams?.endDate || monthEnd;

  const startDate = new Date(startDateParam);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(endDateParam);
  endDate.setHours(23, 59, 59, 999);

  const filteredPatients = patients.filter(patient => {
    const patientDate = new Date(patient.createdAt);
    return patientDate >= startDate && patientDate <= endDate;
  });

  filteredPatients.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const patientsByDate = await getPatientsByDate(q, startDate, endDate);

  // const totalCost = patientsByDate.reduce((sum, patient) => sum + patient.costTotal, 0);
  return (
    <div className={styles.container}>
      <div className="flex flex-col gap-4 mb-4">
        <DateRangeForm />
        <div className="flex flex-rows justify-between">
          <Search placeholder="Search for a patient..." />
          <div className="flex gap-2">
            {/* <Link href="/dashboard/patients/add">
              <button className={styles.addButton}>Add New</button>
            </Link> */}
            <AddPatientModal data={tests}/>
            <a href={`/api/downloadPatients?startDate=${startDateParam}&endDate=${endDateParam}&q=${q}`} download>
            <div
        className="flex justify-center items-center cursor-pointer bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <h1 className="text-xl font-semibold">Download</h1>
      </div>
            </a>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-end mb-4">
        <strong>Total Cost: {totalCost}</strong>
      </div> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Serial</td>
            <td>Name</td>
            <td>Age/Sex</td>
            <td>Date</td>
            <td>Cost Total</td>
            <td>Transaction Mode</td>
            <td>Doctor Referred</td>
            <td>Place</td>
            <td>Added By</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {patientsByDate.map((patient, index) => (
            <tr key={patient.id}>
              <td>{index + 1}.</td>
              <td>{patient.name}</td>
              <td>{patient.ageSex}</td>
              <td>{new Date(patient.date).toDateString()}</td>
              <td>{patient.costTotal}</td>
              <td>{patient.transactionMode}</td>
              <td>{patient.doctorReferred}</td>
              <td>{patient.place}</td>
              <td>{patient.addedBy}</td>
              <td>
              <div className="flex flex-col gap-1">
  {(user.isAdmin || user.isManager) && (
    <div className="flex justify-between items-center gap-1">
      <Link href={`/dashboard/patients/${patient.id}`}>
        <button className={`${styles.button} ${styles.view}`}>View</button>
      </Link>
      <DeleteBtn id={patient.id} comp="Patient" />
    </div>
  )}
  <ViewTestModal data={patient.tests} />
</div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsPage;
