/* eslint-disable react/no-array-index-key */
import styles from '../../../styles/Market.module.sass';

interface Detail {
  detailLabel: String;
  value: String;
}

interface Props {
  details: Array<Detail>;
}

const TradeDetails = ({ details }: Props) => (
  <div className={styles.tradeDetails}>
    {details.map(({ detailLabel, value }, i) => (
      <div key={i} className={styles.tradeDetail}>
        <p>{detailLabel}</p>
        <p>{value}</p>
      </div>
    ))}
  </div>
);

export default TradeDetails;
