import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import TradeDetails from "./TradeDetails";
import styles from "../../styles/Market.module.sass";

const Trade = ({ details, makeTransaction }) => {
  const [whichOption, setWhichOption] = useState(0);
  const [amount, setAmount] = useState(null);
  const [etherUnit, setEtherUnit] = useState(0);

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

  const etherUnits = [
    { value: 0, label: "Wei" },
    { value: 1, label: "Ether" },
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
          <div className={styles.Select}>
            <Select
              defaultValue={etherUnits[etherUnit]}
              value={etherUnits[etherUnit]}
              options={etherUnits}
              onChange={(unit) => setEtherUnit(unit.value)}
            />
          </div>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount ? amount : ""}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <TradeDetails details={buyingDetails} />
      </div>

      <div className={styles.trade}>
        <button onClick={() => makeTransaction(amount, etherUnit, whichOption)}>
          Stake
        </button>
      </div>
    </div>
  );
};

export default Trade;
