import { fetchPatientsToday } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/patients.module.css";

const PatientTodayPage = async () => {
  const patients = await fetchPatientsToday();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patients Added Today</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Serial</td>
            <td>Name</td>
            <td>Age/Sex</td>
            <td>Date</td>
            <td>Tests</td>
            <td>Cost Total</td>
            <td>Transaction Mode</td>
            <td>Doctor Referred</td>
            <td>Place</td>
            <td>Added By</td>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="10" className={styles.noData}>No patients added today.</td>
            </tr>
          ) : (
            patients.map((patient, index) => {
              // Parse the tests string into an array
              const testArray = JSON.parse(patient.tests);

              return (
                <tr key={patient.id}>
                  <td>{index + 1}.</td>
                  <td>{patient.name}</td>
                  <td>{patient.ageSex}</td>
                  <td>{new Date(patient.date).toDateString()}</td>
                  <td>
                    {testArray.length > 0 ? (
                      <ul>
                        {testArray.map((test, testIndex) => (
                          <li key={testIndex}>{test}</li>
                        ))}
                      </ul>
                    ) : (
                      "No tests"
                    )}
                  </td>
                  <td>{patient.costTotal}</td>
                  <td>{patient.transactionMode}</td>
                  <td>{patient.doctorReferred}</td>
                  <td>{patient.place}</td>
                  <td>{patient.addedBy}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTodayPage;
