/* eslint-disable react/no-array-index-key */
import styles from "../../../styles/Market.module.sass";

const TradeDetails = ({ details }) => (
  <div className={styles.tradeDetails}>
    {details.map(({ label, value }, i) => (
      <div key={i} className={styles.tradeDetail}>
        <p>{label}</p>
        <p>{value} wei</p>
      </div>
    ))}
  </div>
);

export default TradeDetails;
