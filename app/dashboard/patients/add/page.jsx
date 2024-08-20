// patients/add/page.jsx

import { addPatient } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/patients/addPatient/addPatient.module.css";

const AddPatientPage = () => {
  return (
    <div className={styles.container}>
      <form action={addPatient} className={styles.form}>
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Age/Sex" name="ageSex" required />
        <input type="text" placeholder="Tests" name="tests" required />
        <input type="number" placeholder="Cost Total" name="costTotal" required />
        <input type="text" placeholder="Transaction Mode" name="transactionMode" required />
        <input type="text" placeholder="Doctor Referred" name="doctorReferred" required />
        <input type="text" placeholder="Place" name="place" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPatientPage;
