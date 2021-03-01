import { useState } from "react";
import Select from "react-select";

import styles from "../../styles/Market.module.sass";
import TradeDetails from "./TradeDetails";

const Trade = ({
  details,
  makeTransaction,
  showWalletModal,
  wallet,
  phase,
  userHistory,
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
    { value: 1, label: "Matic" },
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
                  details.details.max === id && phase === 4
                    ? buttonColorClasses[0]
                    : phase !== 4 && whichOption === id
                    ? buttonColorClasses[id]
                    : undefined
                }
                onClick={() => !(phase === 4) && setWhichOption(id)}
              >
                {option}
                <span>{` - ${details.details[2][0][id]}%`}</span>
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
        {userHistory.length ? (
          <>
            <p>Your stakes:</p>
            <TradeDetails details={userHistory} />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.trade}>
        {(phase === 1 || phase === 3) && (
          <button
            type="submit"
            background={(phase !== 1 || phase !== 3) && "darkgrey"}
          >
            Stake
          </button>
        )}
        {phase === 4 && (
          <button
            onClick={() => {
              wallet
                ? makeTransaction(amount, etherUnit, whichOption, 1)
                : showWalletModal();
            }}
            style={{ margin: "4px 0" }}
          >
            Redeem Stake Payout
          </button>
        )}
        {phase === 4 && (
          <button
            onClick={() => {
              wallet
                ? makeTransaction(amount, etherUnit, whichOption, 2)
                : showWalletModal();
            }}
            style={{ margin: "4px 0" }}
          >
            Redeem Reporting Payout
          </button>
        )}
      </div>
    </form>
  );
};

export default Trade;
