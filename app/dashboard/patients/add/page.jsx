import { addPatient } from "@/app/lib/actions";
import { fetchTests } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/addPatient/addPatient.module.css";
import dynamic from "next/dynamic";

// Dynamically import the MultiSelectDropdown to enable client-side rendering
const MultiSelectDropdown = dynamic(() => import("./MultiSelectDropdown"), { ssr: false });

const AddPatientPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, tests } = await fetchTests(q, page);

  // Since useState cannot be used here, we will handle state on the client side
  return (
    <div className={styles.container}>
      <form action={addPatient} className={styles.form} method="POST">
        <input type="text" placeholder="Name" name="name" required className={styles.input} />
        <input type="number" placeholder="Age" name="age" required className={styles.input} />
        <select name="sex" required className={styles.select}>
          <option value={"F"}>Female</option>
          <option value={"M"}>Male</option>
        </select>

        <div>
          <MultiSelectDropdown options={tests} />
        </div>
        <select name="testType" required className={styles.select}>
          <option value={"Regular"}>Regular</option>
          <option value={"Night"}>Night</option>
          <option value={"Wholesale"}>Wholesale</option>
        </select>
        <input type="number" placeholder="Cost Total" name="costTotal" required className={styles.input} />
        <select name="transactionMode" required className={styles.select}>
          <option value={"Cash"}>Cash</option>
          <option value={"Card"}>Card</option>
          <option value={"UPI"}>UPI</option>
        </select>
        <input type="text" placeholder="Doctor Referred" name="doctorReferred" required className={styles.input} />
        <input type="text" placeholder="Place" name="place" required className={styles.input} />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default AddPatientPage;
