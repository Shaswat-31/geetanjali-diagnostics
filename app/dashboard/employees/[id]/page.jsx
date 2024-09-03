import { updateUser } from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { Avatar } from "@chakra-ui/react";
// import Image from "next/image";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className="flex flex-col gap-6 justify-center items-center">
          {/* <Image src={user.img || "/noavatar.png"} alt={`${user.username}'s Avatar`} fill /> */}
          <Avatar size='2xl' name="user.username"/>
        
        <h2>{user.username}</h2>
      </div></div>

      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form} method="POST">
          <input type="hidden" name="id" value={user.id} />

          <label>Username</label>
          <input type="text" name="username" defaultValue={user.username} required minLength="3" maxLength="20" />

          <label>Email</label>
          <input type="email" name="email" defaultValue={user.email} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Update password (optional)" />

          <label>Phone</label>
          <input type="text" name="phone" defaultValue={user.phone} />

          <label>Address</label>
          <textarea name="address" defaultValue={user.address} />

          <label>Is Admin?</label>
          <select name="isAdmin" defaultValue={user.isAdmin}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Manager?</label>
          <select name="isManager" defaultValue={user.isManager}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
