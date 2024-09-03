// patients/page.jsx

import { deleteTest } from "@/app/lib/actions";
import { fetchTests } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/patients/patients.module.css";
import Link from "next/link";
import { auth } from "@/app/auth";
import DeleteBtn from "@/app/_components/deleteBtn";
const TestsPage = async ({ searchParams }) => {
    const { user } = await auth();
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { count, tests } = await fetchTests(q, page);
  
  //   if (!user.isAdmin) {
  //     return (
  //       // <Unauthorized/>
  //       <div className="flex flex-col items-center justify-center min-h-screen">
  //   <img src="/notAuth.png" alt="Not Authorized" className="w-64 h-64 mb-8" />
  //   <h1 className="text-3xl font-bold text-red-600">Sorry, you are not authorized.</h1>
  //   <p className="mt-4 text-gray-600">Please contact the administrator if you believe this is a mistake.</p>
  // </div>
  
  //     );
  //   }
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
              {
                user.isAdmin && <td>Chemical Cost</td>
              }
              <td>Area Rate</td>
              <td>Regular Cost</td>
              <td>Night Cost</td>
              <td>Wholesale Cost</td>
              {user.isAdmin && <td>Action</td>}
            </tr>
          </thead>
          <tbody>
            {tests.map((test,index) => (
              <tr key={test.id}>
                <td>{index+1}</td>
                <td>{test.testName}</td>
                <td>{test.inventoryStatus}</td>
                {
                  user.isAdmin && <td>{test.chemicalCost}</td>
                }
               
                <td>{test.areaRate}</td>
                <td>{test.regularCost}</td>
                <td>{test.nightCost}</td>
                <td>{test.wholesaleCost}</td>
                {user.isAdmin && (
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/tests/${test.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                       <DeleteBtn id={test.id} comp="Test"/>
                      
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
