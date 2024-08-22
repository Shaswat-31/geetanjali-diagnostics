import { addPatient } from "@/app/lib/actions";
import { fetchTests } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/addPatient/addPatient.module.css";

const AddPatientPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, tests } = await fetchTests(q, page);

  return (
    <div className={styles.container}>
      <form action={addPatient} className={styles.form}>
        <input type="text" placeholder="Name" name="name" required />
        <input type="number" placeholder="Age" name="age" required />
        <select name="sex" required>
          <option value={"F"}>Female</option>
          <option value={"M"}>Male</option>
        </select>
        <select name="tests" required>
          {tests.map((test) => (
            <option key={test._id} value={test.testName}>
              {test.testName}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Enter if more tests" name="test2" />
        <select name="testType" required>
          <option value={"Regular"}>Regular</option>
          <option value={"Night"}>Night</option>
          <option value={"Wholesale"}>Wholesale</option>
        </select>
        <input type="number" placeholder="Cost Total" name="costTotal" required />
        <select name="transactionMode" required>
          <option value={"Cash"}>Cash</option>
          <option value={"Card"}>Card</option>
          <option value={"UPI"}>UPI</option>
        </select>
        <input type="text" placeholder="Doctor Referred" name="doctorReferred" required />
        <input type="text" placeholder="Place" name="place" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPatientPage;
