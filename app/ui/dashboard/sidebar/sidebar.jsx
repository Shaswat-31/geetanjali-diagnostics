import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { auth, signOut } from "@/app/auth";
import { Avatar } from "@chakra-ui/react";
import { FaHospitalUser } from "react-icons/fa6";
import { LiaHospitalAltSolid } from "react-icons/lia";
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Employees",
        path: "/dashboard/employees",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Patients",
        path: "/dashboard/patients",
        icon: <LiaHospitalAltSolid />,
      },
      {
        title: "Tests",
        path: "/dashboard/tests",
        icon: <FaHospitalUser />,
      },
    ],
  },
  {
    title: "User",
    list: [
    ],
  },
];

const Sidebar = async () => {
  const { user } = await auth();
  console.log(user.isAdmin);
  return (
    <div className={styles.container}>
      <div className={styles.user}>
      <Avatar name={user.username} src='https://bit.ly/broken-link' />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>
            {
              user.isAdmin?
              "Administrator" :
              "Employee"
            }
            </span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          <h1>Logout</h1>
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
