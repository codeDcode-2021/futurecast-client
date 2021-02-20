import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import styles from "../../styles/TransactionComplete.module.sass";
import CheckAnimation from "../../assets/animations/1798-check-animation.json";
import CrossAnimation from "../../assets/animations/4970-unapproved-cross.json";

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

const TransactionComplete = () => {
  const history = useHistory();
  let response, details, newQuestion;
  let defaultOptions;

  try {
    response = history.location.state.response;
    details = history.location.state.details;
    newQuestion = history.location.state.newQuestion;

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
          {response.status && (
            <p>
              To:
              <span className={styles.value}>{response.to}</span>
            </p>
          )}
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
          {!newQuestion ? (
            <>
              <p>
                Option:<span className={styles.value}>{details.option}</span>
              </p>
              <p>
                Amount:<span className={styles.value}>{details.amount}</span>
              </p>
            </>
          ) : (
            <>
              {details.options.map((option, id) => (
                <p key={id}>
                  Option {id + 1}:<span className={styles.value}>{option}</span>
                </p>
              ))}
              <p>
                Betting end date:
                <span className={styles.value}>
                  {parseDates(details.bettingEndDate)}
                </span>
              </p>
              <p>
                Event end date:
                <span className={styles.value}>
                  {parseDates(details.eventEndDate)}
                </span>
              </p>
            </>
          )}
          {response.status && (
            <p>
              Gas used:
              <span className={styles.value}>{response.gasUsed} wei</span>
            </p>
          )}
          <Link to="/">
            <button className={styles.home}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TransactionComplete;
