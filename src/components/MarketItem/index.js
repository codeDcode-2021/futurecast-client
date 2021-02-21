import { Link } from "react-router-dom";
import styles from "../../styles/MarketItem.module.sass";

const MarketItem = ({ market }) => {
  return (
    <Link to={`/market/${market.details.address}`}>
      <div className={styles.container}>
        <p className={styles.question}>
          Q:
          {` ${market["details"][0]}`}
          {/* {` ${market["owner"]}`} */}
        </p>
        <div className={styles.options}>
          <p>Volume: {market["details"]["total"]} Matic</p>
          <div className={styles.voteOptions}>
            {market["details"][3].map((detail, id) => (
              <p key={id} className={styles.voteOption}>
                {market["details"][3][id]}:
                <span className={styles.voteValue}>
                  {" "}
                  {market["details"][2][0][id]}%
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MarketItem;
