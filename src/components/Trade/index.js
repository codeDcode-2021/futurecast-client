import { useState } from "react";
import styles from "../../styles/Market.module.sass";
import TradeDetails from "./TradeDetails";

const Trade = ({ details }) => {
  const [whichOption, setWhichOption] = useState(0);

  const buttonColorClasses = [
    styles.option1,
    styles.option2,
    styles.option3,
    styles.option4,
    styles.option5,
    styles.option6,
  ];

  const buyingDetails = [
    { detailLabel: "Your avg. price", value: "₹ 0.00" },
    { detailLabel: "Estimated Shares Bought", value: "0.00" },
    { detailLabel: "Maximum Winnings", value: "₹ 0.00" },
    { detailLabel: "Max Return on investment", value: "0.00 %" },
  ];

  return (
    <div className={styles.tradeContainer}>
      <div className={styles.makeTradeContainer}>
        <div className={styles.makeTradeOptionsContainer}>
          <p className={styles.chooseOutcomeLabel}>Pick Outcome</p>
          <div className={styles.makeTradeOptions}>
            {details.details[3].map((option, id) => (
              <button
                key={id}
                type="button"
                className={
                  whichOption === id ? buttonColorClasses[id] : undefined
                }
                onClick={() => setWhichOption(id)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tradeValueInput}>
          <p className={styles.tradeValueInputLabel}>How much?</p>
          <input type="number" step="0.01" placeholder="0.00" />
        </div>

        <TradeDetails details={buyingDetails} />
      </div>

      <div className={styles.trade}>
        <button type="button">Stake</button>
      </div>
    </div>
  );
};

export default Trade;
