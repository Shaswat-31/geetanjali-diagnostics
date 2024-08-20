// patients/[id]/page.jsx

import { updatePatient } from "@/app/lib/actions";
import { fetchPatient } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/singlePatient/singlePatient.module.css";

const SinglePatientPage = async ({ params }) => {
  const { id } = params;
  const patient = await fetchPatient(id);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updatePatient} className={styles.form}>
          <input type="hidden" name="id" value={patient.id} />
          <label>Name</label>
          <input type="text" name="name" placeholder={patient.name} />
          <label>Age/Sex</label>
          <input type="text" name="ageSex" placeholder={patient.ageSex} />
          <label>Tests</label>
          <input type="text" name="tests" placeholder={patient.tests} />
          <label>Cost Total</label>
          <input type="number" name="costTotal" placeholder={patient.costTotal} />
          <label>Transaction Mode</label>
          <input type="text" name="transactionMode" placeholder={patient.transactionMode} />
          <label>Doctor Referred</label>
          <input type="text" name="doctorReferred" placeholder={patient.doctorReferred} />
          <label>Place</label>
          <input type="text" name="place" placeholder={patient.place} />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SinglePatientPage;
