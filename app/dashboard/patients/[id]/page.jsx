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
          <input type="text" name="name" defaultValue={patient.name} />

          <label>Age</label>
          <input type="number" name="age" defaultValue={patient.age} />

          <label>Sex</label>
          <select name="sex" defaultValue={patient.sex}>
            <option value={"F"}>Female</option>
            <option value={"M"}>Male</option>
          </select>

          <label>Tests</label>
          <input type="text" name="tests" defaultValue={patient.tests} />

          <label>Additional Tests</label>
          <input type="text" name="test2" defaultValue={patient.test2} />

          <label>Test Type</label>
          <select name="testType" defaultValue={patient.testType}>
            <option value={"Regular"}>Regular</option>
            <option value={"Night"}>Night</option>
            <option value={"Wholesale"}>Wholesale</option>
          </select>

          <label>Cost Total</label>
          <input type="number" name="costTotal" defaultValue={patient.costTotal} />

          <label>Transaction Mode</label>
          <select name="transactionMode" defaultValue={patient.transactionMode}>
            <option value={"Cash"}>Cash</option>
            <option value={"Card"}>Card</option>
            <option value={"UPI"}>UPI</option>
          </select>

          <label>Doctor Referred</label>
          <input type="text" name="doctorReferred" defaultValue={patient.doctorReferred} />

          <label>Place</label>
          <input type="text" name="place" defaultValue={patient.place} />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SinglePatientPage;
