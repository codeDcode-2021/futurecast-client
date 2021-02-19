import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import styles from "../../styles/TransactionComplete.module.sass";
import CheckAnimation from "../../assets/animations/1798-check-animation.json";
import CrossAnimation from "../../assets/animations/4970-unapproved-cross.json";

const TransactionComplete = () => {
  const history = useHistory();
  let response, details;
  let defaultOptions;

  try {
    response = history.location.state.response;
    details = history.location.state.details;

    defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: response.status ? CheckAnimation : CrossAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  } catch (e) {
    history.push({
      pathname: "/",
    });
  }

  return history.location.state ? (
    <div className={styles.container}>
      <div>
        <div className={styles.animationContainer}>
          <div>
            <Lottie options={defaultOptions} height={132} width={132} />
          </div>
          <p>
            {response.status ? "Transaction Complete" : "Transaction Failed"}
          </p>
        </div>
        <div className={styles.detailsContainer}>
          <p>
            From:
            <span className={styles.value}>{response.from}</span>
          </p>
          <p>
            To:
            <span className={styles.value}>{response.to}</span>
          </p>
          <p>
            Status:
            <span className={styles.value}>
              {response.status ? "Success" : "Failed"}
            </span>
          </p>
          <br />
          <p>
            Question:
            <span className={styles.value}>{details.question}</span>
          </p>
          <p>
            Option:<span className={styles.value}>{details.option}</span>
          </p>
          <p>
            Amount:<span className={styles.value}>{details.amount}</span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TransactionComplete;
