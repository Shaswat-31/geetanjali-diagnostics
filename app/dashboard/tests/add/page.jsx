// patients/add/page.jsx

import { addTest } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/patients/addPatient/addPatient.module.css";

const AddTestPage = () => {
  return (
    <div className={styles.container}>
      <form action={addTest} className={styles.form}>
        <input type="text" placeholder="Test Name" name="testName" required />
        <select name="inventoryStatus" required>
          <option value="" disabled>Select Inventory Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <input type="number" placeholder="Chemical Cost" name="chemicalCost" required />
        <input type="number" placeholder="Area Rate" name="areaRate" required />
        <input type="number" placeholder="Regular Cost" name="regularCost" required />
        <input type="number" placeholder="Profit" name="profit" required />
        <input type="number" placeholder="Night Cost" name="nightCost" required />
        <input type="number" placeholder="Night Profit" name="nightProfit" required />
        <input type="number" placeholder="Wholesale Cost" name="wholesaleCost" required />
        <input type="number" placeholder="Wholesale Profit" name="wholesaleProfit" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTestPage;
