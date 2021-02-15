import MarketItem from '../MarketItem';
import styles from '../../styles/MarketGrid.module.sass';

// interface Market {
//   id: string;
//   marketName: String;
// }

// interface Props {
//   markets: Array<Market>;
// }

const MarketGrid = ({ markets }) => {
  console.log(markets);

  return (
    <div className={styles.container}>
      <h4 className={styles.marketHeading}>Popular Markets:</h4>
      {markets.map((market, id) => (
        // <MarketItem marketName={market.details[0]} featured />
        <div key={id}>{market.details[0]}</div>
      ))}
    </div>
  );
};

export default MarketGrid;
