import { updatePatient } from "@/app/lib/actions";
import { fetchPatient, fetchTests } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/singlePatient/singlePatient.module.css";
import dynamic from "next/dynamic";

const DropDown = dynamic(() => import("./DropDown"), { ssr: false });

const SinglePatientPage = async ({ params }) => {
  const { id } = params;
  const { count, tests } = await fetchTests();
  const patient = await fetchPatient(id);

  // Convert patient.tests to a list of names if it's not already
  const patientTests = patient.tests ? JSON.parse(patient.tests) : [];

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updatePatient} className={styles.form}>
          <input type="hidden" name="id" value={patient.id} />

          <label>Name</label>
          <input type="text" name="name" defaultValue={patient.name} />

          <label>Age</label>
          <input type="text" name="age" defaultValue={(patient.ageSex).split("/")[0]} />

          <label>Sex : {(patient.ageSex).split("/")[1]}</label>
          <select name="sex" defaultValue={(patient.ageSex).split("/")[1]}>
            <option value={"F"}>Female</option>
            <option value={"M"}>Male</option>
          </select>

          <div>
            <DropDown options={tests} List={patientTests} />
          </div>

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
