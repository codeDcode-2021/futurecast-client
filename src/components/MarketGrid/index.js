import MarketItem from "../MarketItem";
import styles from "../../styles/MarketGrid.module.sass";

const MarketGrid = ({ markets, text }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.marketHeading}>{text}:</h4>
      <>
        {markets &&
          markets.map((market, id) => (
            <MarketItem key={market.details.address} market={market} />
          ))}
      </>
    </div>
  );
};

export default MarketGrid;
