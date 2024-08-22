import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/app/auth";
import {Unauthorized} from "@/app/_components/unauthorized"

const UsersPage = async ({ searchParams }) => {
  const { user } = await auth();
  console.log(user.isAdmin);
  console.log(user.username);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
 
  if (!user.isAdmin) {
    return (
      // <Unauthorized/>
      <div className="flex flex-col items-center justify-center min-h-screen">
  <img src="/notAuth.png" alt="Not Authorized" className="w-64 h-64 mb-8" />
  <h1 className="text-3xl font-bold text-red-600">Sorry, you are not authorized.</h1>
  <p className="mt-4 text-gray-600">Please contact the administrator if you believe this is a mistake.</p>
</div>

    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        {user.isAdmin && 
           <Link href="/dashboard/employees/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
        }
       
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            {
              user.isAdmin && 
              <td>Action</td>
            }
          </tr>
        </thead>
        <tbody>
          {users.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={emp.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {emp.username}
                </div>
              </td>
              <td>{emp.email}</td>
              <td>{emp.createdAt?.toString().slice(4, 16)}</td>
              <td>{emp.isAdmin ? "Admin" : "Employee"}</td>
              <td>
              {user.isAdmin && (
                <div className={styles.buttons}>
                  <Link href={`/dashboard/employees/${emp.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                
                    <form action={deleteUser}>
                    <input type="hidden" name="id" value={(emp.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                  
                </div>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
