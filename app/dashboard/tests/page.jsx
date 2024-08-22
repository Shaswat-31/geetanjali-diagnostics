// patients/page.jsx

import { deleteTest } from "@/app/lib/actions";
import { fetchTests } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/patients/patients.module.css";
import Link from "next/link";
import { auth } from "@/app/auth";
const TestsPage = async ({ searchParams }) => {
    const { user } = await auth();
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { count, tests } = await fetchTests(q, page);
  
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a test..." />
          {
            user.isAdmin &&
            <Link href="/dashboard/tests/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
          }
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Serial</td>
              <td>Test Name</td>
              <td>Inventory Status</td>
              <td>Chemical Cost</td>
              <td>Area Rate</td>
              <td>Regular Cost</td>
              <td>Night Cost</td>
              <td>Wholesale Cost</td>
              <td>Added By</td>
              {user.isAdmin && <td>Action</td>}
            </tr>
          </thead>
          <tbody>
            {tests.map((test,index) => (
              <tr key={test.id}>
                <td>{index+1}</td>
                <td>{test.testName}</td>
                <td>{test.inventoryStatus}</td>
                <td>{test.chemicalCost}</td>
                <td>{test.areaRate}</td>
                <td>{test.regularCost}</td>
                <td>{test.nightCost}</td>
                <td>{test.wholesaleCost}</td>
                <td>{test.testAddedBy}</td>
                {user.isAdmin && (
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/tests/${test.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <form action={deleteTest} method="POST">
                        <input type="hidden" name="id" value={test.id} />
                        <button className={`${styles.button} ${styles.delete}`}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
    );
  };
  
  export default TestsPage;
