import { Link } from "react-router-dom";
import styles from "../../styles/MarketItem.module.sass";

const MarketItem = ({ market }) => {
  return (
    <Link to={`/market/${market.details.address}`}>
      <div className={styles.container}>
        <p className={styles.question}>
          Q:
          {` ${market["details"][0]}`}
        </p>
        <div className={styles.options}>
          <p>Volume: ₹ 100,000</p>
          <div className={styles.voteOptions}>
            <p className={styles.voteOption}>
              {market["details"][3][0]}:
              <span className={styles.voteValue}> 0.8</span>
            </p>
            <p className={styles.voteOption}>
              {market["details"][3][1]}:
              <span className={styles.voteValue}> 0.2</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MarketItem;
