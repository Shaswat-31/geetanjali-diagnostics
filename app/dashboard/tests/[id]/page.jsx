import { updateTest } from "@/app/lib/actions";
import { fetchTest } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/singlePatient/singlePatient.module.css";

const SingleTestPage = async ({ params }) => {
  const { id } = params;
  const test = await fetchTest(id);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateTest} className={styles.form}>
          <input type="hidden" name="id" value={test.id} />
          
          <label>Test Name</label>
          <input type="text" name="testName" defaultValue={test.testName} required />
          
          <label>Inventory Status</label>
          <select name="inventoryStatus" defaultValue={test.inventoryStatus} required>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          
          <label>Chemical Cost</label>
          <input type="number" name="chemicalCost" defaultValue={test.chemicalCost} required />
          
          <label>Area Rate</label>
          <input type="number" name="areaRate" defaultValue={test.areaRate} required />
          
          <label>Regular Cost</label>
          <input type="number" name="regularCost" defaultValue={test.regularCost} required />
          
          <label>Profit</label>
          <input type="number" name="profit" defaultValue={test.profit} required />
          
          <label>Night Cost</label>
          <input type="number" name="nightCost" defaultValue={test.nightCost} required />
          
          <label>Night Profit</label>
          <input type="number" name="nightProfit" defaultValue={test.nightProfit} required />
          
          <label>Wholesale Cost</label>
          <input type="number" name="wholesaleCost" defaultValue={test.wholesaleCost} required />
          
          <label>Wholesale Profit</label>
          <input type="number" name="wholesaleProfit" defaultValue={test.wholesaleProfit} required />
          
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTestPage;
