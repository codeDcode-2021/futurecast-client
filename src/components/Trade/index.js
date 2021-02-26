import { useState } from "react";
import Select from "react-select";

import styles from "../../styles/Market.module.sass";

const Trade = ({
  details,
  makeTransaction,
  showWalletModal,
  wallet,
  phase,
}) => {
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

  const etherUnits = [
    { value: 0, label: "Wei" },
    { value: 1, label: "Ether" },
  ];

  return (
    <form
      className={styles.tradeContainer}
      onSubmit={(e) => {
        e.preventDefault();
        if (phase === 1 || phase === 3) {
          wallet
            ? makeTransaction(amount, etherUnit, whichOption, 0)
            : showWalletModal();
        } else if (phase === 4) {
          wallet
            ? makeTransaction(amount, etherUnit, whichOption, 1)
            : showWalletModal();
        }
      }}
    >
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
            disabled={phase !== 1 && phase !== 3 ? true : false}
            required
          />
        </div>
      </div>
      <div className={styles.trade}>
        <button
          type="submit"
          background={(phase !== 1 || phase !== 3) && "darkgrey"}
        >
          {phase === 1 || phase === 3 ? "Stake" : "Redeem Stake Payout"}
        </button>
        {phase === 4 && (
          <button
            background={(phase !== 1 || phase !== 2) && "darkgrey"}
            onClick={() => {
              wallet
                ? makeTransaction(amount, etherUnit, whichOption, 2)
                : showWalletModal();
            }}
          >
            Redeem Reporting Payout
          </button>
        )}
      </div>
    </form>
  );
};

export default Trade;
