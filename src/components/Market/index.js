import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import Trade from "../Trade";
import styles from "../../styles/Market.module.sass";

import LoadingAnimation from "../LoadingAnimation";

const parseDates = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  const string = `${day} / ${month} / ${year} - ${hours}:${minutes.substr(-2)}`;

  return string;
};

const phaseOptions = {
  0: {
    value: "Haven't started",
    color: "black",
  },
  1: {
    value: "Betting",
    color: "#05b16a",
  },
  2: {
    value: "Inactive",
    color: "#e04545",
  },
  3: {
    value: "Reporting",
    color: "#ffc75f",
  },
  4: {
    value: "Resolved",
    color: "#0779e4",
  },
};

const Market = ({
  markets,
  questionInstance,
  walletAddress,
  showWalletModal,
  myRecents,
}) => {
  const [isTransacting, setIsTransacting] = useState(false);
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  let phase = 0;

  let userHistory = [];

  if (myRecents && details) {
    if (myRecents[id]) {
      const data = myRecents[id];
      userHistory = Object.keys(data).map((id) => {
        const detail = {
          label: details.details[3][id],
          value: data[id],
        };
        return detail;
      });
    }
  }

  useEffect(() => {
    if (markets) {
      const details = markets.filter((market) => market.details.address === id);
      setDetails(details[0]);
    }
  }, [markets, id]);

  if (details) {
    const dates = details.details[1];
    const date = new Date() / 1000;

    if (date < date[0]) {
      phase = 0;
    } else if (date >= dates[0] && date <= dates[1]) {
      phase = 1;
    } else if (date >= dates[1] && date <= dates[2]) {
      phase = 2;
    } else if (details.details.resolvedPercentage > 50) {
      phase = 4;
    } else if (date >= dates[2]) {
      phase = 3;
    }
  }

  const questionStake = async (amount, etherUnit, whichOption, redeem) => {
    let actualAmount = amount;
    if (etherUnit === 1) {
      actualAmount = actualAmount * 10 ** 18;
    }

    if (phase === 1) {
      console.log("bettings");
      const thisQuestion = await questionInstance(id);

      const data = {
        question: details.details[0],
        option: details.details[3][whichOption],
        amount: `${etherUnit ? `${amount} Matic` : `${amount} wei`}`,
      };

      thisQuestion.methods
        .stake(whichOption)
        .send({
          from: walletAddress,
          value: actualAmount,
        })
        .then((tx) => {
          history.push({
            pathname: "/transaction",
            state: {
              newQuestion: false,
              response: tx,
              details: data,
            },
          });
        })
        .catch((err) => {
          history.push({
            pathname: "/transaction",
            state: {
              newQuestion: false,
              response: { ...err, status: false, from: walletAddress, to: id },
              details: data,
            },
          });
        });
    } else if (phase === 3 && redeem === 0) {
      const thisQuestion = await questionInstance(id);

      const data = {
        question: details.details[0],
        option: details.details[3][whichOption],
        amount: `${etherUnit ? `${amount} ether` : `${amount} wei`}`,
      };

      thisQuestion.methods
        .stakeForReporting(whichOption)
        .send({
          from: walletAddress,
          value: actualAmount,
        })
        .then((tx) => {
          history.push({
            pathname: "/transaction",
            state: {
              newQuestion: false,
              response: tx,
              details: data,
            },
          });
        })
        .catch((err) => {
          history.push({
            pathname: "/transaction",
            state: {
              newQuestion: false,
              response: { ...err, status: false, from: walletAddress, to: id },
              details: data,
            },
          });
        });
    } else if (phase === 4) {
      if (redeem === 2) {
        const thisQuestion = await questionInstance(id);

        const data = {
          question: "Redeeming Reporting Payout",
          option: "NA",
          amount: "NA",
        };

        console.log(data);

        thisQuestion.methods
          .redeemReportingPayout()
          .send({
            from: walletAddress,
          })
          .then((tx) => {
            history.push({
              pathname: "/transaction",
              state: {
                newQuestion: false,
                response: tx,
                details: data,
              },
            });
          })
          .catch((err) => {
            history.push({
              pathname: "/transaction",
              state: {
                newQuestion: false,
                response: {
                  ...err,
                  status: false,
                  from: walletAddress,
                  to: id,
                },
                details: data,
              },
            });
          });
      } else if (redeem === 1) {
        const data = {
          question: "Redeeming Reporting Payout",
          option: "NA",
          amount: "NA",
        };

        const thisQuestion = await questionInstance(id);
        thisQuestion.methods
          .redeemStakedPayout()
          .send({
            from: walletAddress,
          })
          .then((tx) => {
            history.push({
              pathname: "/transaction",
              state: {
                newQuestion: false,
                response: tx,
                details: data,
              },
            });
          })
          .catch((err) => {
            history.push({
              pathname: "/transaction",
              state: {
                newQuestion: false,
                response: {
                  ...err,
                  status: false,
                  from: walletAddress,
                  to: id,
                },
                details: data,
              },
            });
          });
      }
    }
    setIsTransacting(true);
  };

  return details && !isTransacting ? (
    <div className={styles.market}>
      <div className={styles.questionContainer}>
        <div className={styles.questionIconContainer}>
          <img
            src="https://img.icons8.com/bubbles/100/000000/question-mark.png"
            alt="question mark icon"
            className={styles.questionIcon}
          />
        </div>
        <p className={styles.question}>{details.details[0]}</p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.heading}>{phase ? "Started" : "Starts"} on</p>
          <p className={styles.detail}>{parseDates(details.details[1][0])}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.heading}>Betting ends on</p>
          <p className={styles.detail}>{parseDates(details.details[1][1])}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.heading}>Event ends on</p>
          <p className={styles.detail}>{parseDates(details.details[1][2])}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.heading}>Phase</p>
          <p
            className={styles.detail}
            style={{ color: phaseOptions[phase]["color"] }}
          >
            {phaseOptions[phase]["value"]}
          </p>
        </div>
      </div>
      <Trade
        details={details}
        makeTransaction={questionStake}
        showWalletModal={showWalletModal}
        wallet={walletAddress}
        phase={phase}
        userHistory={userHistory}
      />
      {/* <div className={styles.marketDescription}>
        <p>Description:</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nostrum
          repudiandae qui facilis assumenda labore nemo dicta, reprehenderit,
          consequuntur aperiam ea velit quidem optio praesentium itaque nobis
          sapiente eos possimus?
        </p>
      </div> */}
    </div>
  ) : (
    <div className={styles.loadingAnimationContainer}>
      <div className={styles.pleaseWait}>
        <LoadingAnimation />
        {isTransacting && <p>Please wait, while we process your transaction</p>}
      </div>
    </div>
  );
};

export default Market;
