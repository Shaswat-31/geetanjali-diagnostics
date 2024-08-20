import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/app/auth";
const UsersPage = async ({ searchParams }) => {
  const { user } = await auth();
  console.log(user.isAdmin);
  console.log(user.username);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        {user.isAdmin && 
           <Link href="/dashboard/users/add">
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
            <td>Status</td>
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
              <td>{emp.isAdmin ? "Admin" : "Client"}</td>
              <td>{emp.isActive ? "active" : "passive"}</td>
              <td>
              {user.isAdmin && (
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${emp.id}`}>
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
