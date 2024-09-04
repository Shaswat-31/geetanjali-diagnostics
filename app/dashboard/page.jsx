import { fetchCardsData, fetchTests } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";
import FinancePage from "./finance/page";
import { auth } from "../auth";
const Dashboard = async() => {
  const cards= await fetchCardsData();
  const {tests}=await fetchTests();
  const {user}=await auth();
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        {
          user.isAdmin &&
          <FinancePage/>
        }
        <Transactions data={tests}/>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
