// patients/[id]/page.jsx

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
          <input type="text" name="testName" placeholder={test.testName} />
          <label>Inventory Status</label>
          <input type="text" name="inventoryStatus" placeholder={test.inventoryStatus} />
          <label>Chemical Cost</label>
          <input type="number" name="chemicalCost" placeholder={test.chemicalCost} />
          <label>Area Rate</label>
          <input type="number" name="areaRate" placeholder={test.areaRate} />
          <label>Regular Cost</label>
          <input type="number" name="regularCost" placeholder={test.regularCost} />
          <label>Profit</label>
          <input type="number" name="profit" placeholder={test.profit} />
          <label>Night Cost</label>
          <input type="number" name="nightCost" placeholder={test.nightCost} />
          <label>Wholesale Profit</label>
          <input type="number" name="wholesaleCost" placeholder={test.wholesaleProfit} />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTestPage;
