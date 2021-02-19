import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import styles from "../../styles/TransactionComplete.module.sass";
import CheckAnimation from "../../assets/animations/1798-check-animation.json";
import CrossAnimation from "../../assets/animations/4970-unapproved-cross.json";

const TransactionComplete = ({ transactionObject }) => {
  const history = useHistory();

  // if (!transactionObject) {
  //   history.push({
  //     pathname: "/",
  //   });
  // }
  transactionObject = {};
  transactionObject.status = false;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: transactionObject.status ? CheckAnimation : CrossAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.container}>
      <div>
        {transactionObject.status ? (
          <>
            <div className={styles.animationContainer}>
              <div>
                <Lottie options={defaultOptions} height={132} width={132} />
              </div>
              <p>Transaction Complete</p>
            </div>
            <div className={styles.detailsContainer}>
              <p>
                From:
                <span className={styles.value}>
                  0x25D462D16976d6a4C7dc84AcCdE629a25a9aA07C
                </span>
              </p>
              <p>
                To:
                <span className={styles.value}>
                  0x25D462D16976d6a4C7dc84AcCdE629a25a9aA07C
                </span>
              </p>
              <p>
                Status:
                <span className={styles.value}>Success</span>
              </p>
              <br />
              <p>
                Question:
                <span className={styles.value}>
                  Who will win the world cup?
                </span>
              </p>
              <p>
                Option:<span className={styles.value}>India</span>
              </p>
              <p>
                Amount:<span className={styles.value}>1 ether</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.animationContainer}>
              <div>
                <Lottie options={defaultOptions} height={132} width={132} />
              </div>
              <p>Transaction Failed</p>
            </div>
            <div className={styles.detailsContainer}>
              <p>
                From:
                <span className={styles.value}>
                  0x25D462D16976d6a4C7dc84AcCdE629a25a9aA07C
                </span>
              </p>
              <p>
                To:
                <span className={styles.value}>
                  0x25D462D16976d6a4C7dc84AcCdE629a25a9aA07C
                </span>
              </p>
              <p>
                Status:
                <span className={styles.value}>Success</span>
              </p>
              <br />
              <p>
                Question:
                <span className={styles.value}>
                  Who will win the world cup?
                </span>
              </p>
              <p>
                Option:<span className={styles.value}>India</span>
              </p>
              <p>
                Amount:<span className={styles.value}>1 ether</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionComplete;
