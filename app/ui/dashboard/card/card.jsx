import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>       
             <Stat>
             <StatLabel>{item.title}' count: </StatLabel>
             <StatHelpText>today</StatHelpText>
             <StatNumber>{item.numberToday}</StatNumber>
           </Stat>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{item.number}</span>
        
      </div>
    </div>
  );
};

export default Card;
