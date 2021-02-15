import styles from '../../styles/MarketItem.module.sass';

interface Props {
  marketName: String;
  featured: boolean;
}

const MarketItem = ({ marketName, featured }) => {
  console.log(marketName);
  return (
    <div>
      Hello-Hello-Hello
    </div>
  );
};

// <div className={styles.container}>
//    <p className={styles.question}>
//      Q:
//     {` ${marketName}`}
//   </p>
//     <div className={styles.options}>
//      <p>Volume: ₹ 100,000</p>
//      <div className={styles.voteOptions}>
//       <p className={styles.voteOption}>
//         Yes:
//           <span className={styles.voteValue}> 0.8</span>
//        </p>
//        <p className={styles.voteOption}>
//         No:
//         <span className={styles.voteValue}> 0.2</span>
//         </p>
//      </div>
//    </div>
// </div>;

export default MarketItem;
