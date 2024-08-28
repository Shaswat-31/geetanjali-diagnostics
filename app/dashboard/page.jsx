import { fetchCardsData, fetchTests } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";

const Dashboard = async() => {
  const cards= await fetchCardsData();
  const {tests}=await fetchTests();
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
          
        <Transactions data={tests}/>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
