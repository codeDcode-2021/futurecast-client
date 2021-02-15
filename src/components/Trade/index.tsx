import { useState } from 'react';
import styles from '../../styles/Market.module.sass';
import TradeDetails from './TradeDetails';

const Trade = () => {
  const [isBuying, setIsBuying] = useState(true);
  const [isOption1, setIsOption1] = useState(true);

  const buyingDetails = [
    { detailLabel: 'Your avg. price', value: '₹ 0.00' },
    { detailLabel: 'Estimated Shares Bought', value: '0.00' },
    { detailLabel: 'Maximum Winnings', value: '₹ 0.00' },
    { detailLabel: 'Max Return on investment', value: '0.00 %' },
  ];

  const sellingDetails = [
    { detailLabel: 'Your avg. price', value: '₹ 0.00' },
    { detailLabel: 'Remaining Shares', value: '0.00' },
    { detailLabel: "You'll Receive", value: '0.00 USDC' },
  ];

  return (
    <div className={styles.tradeContainer}>
      <div className={styles.tradeOptions}>
        <button
          type="button"
          className={isBuying ? styles.tradeOptionSelected : undefined}
          onClick={() => setIsBuying(true)}
        >
          Buy
        </button>
        <button
          type="button"
          className={!isBuying ? styles.tradeOptionSelected : undefined}
          onClick={() => setIsBuying(false)}
        >
          Sell
        </button>
      </div>
      <div className={styles.makeTradeContainer}>
        <div className={styles.makeTradeOptionsContainer}>
          <p className={styles.chooseOutcomeLabel}>Pick Outcome</p>
          <div className={styles.makeTradeOptions}>
            <button
              type="button"
              className={isOption1 ? styles.option1 : undefined}
              onClick={() => setIsOption1(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={!isOption1 ? styles.option2 : undefined}
              onClick={() => setIsOption1(false)}
            >
              No
            </button>
          </div>
        </div>

        <div className={styles.tradeValueInput}>
          <p className={styles.tradeValueInputLabel}>How much?</p>
          <input type="number" step="0.01" placeholder="0.00" />
        </div>

        <TradeDetails details={isBuying ? buyingDetails : sellingDetails} />
      </div>

      <div className={styles.trade}>
        <button type="button">{isBuying ? 'Buy!' : 'Sell!'}</button>
      </div>
    </div>
  );
};

export default Trade;
