import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Trade from "../Trade";
import styles from "../../styles/Market.module.sass";

const Market = ({ markets }) => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (markets) {
      const details = markets.filter((market) => market.details.address === id);
      console.log(details);
      setDetails(details[0]);
    }
  }, [markets, id]);

  return details ? (
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
          <p className={styles.heading}>Market ends on</p>
          <p className={styles.detail}>March 2, 2021</p>
        </div>
        <div className={styles.card}>
          <p className={styles.heading}>Trade volume</p>
          <p className={styles.detail}>₹ 100,000</p>
        </div>
      </div>
      <Trade details={details} />
      <div className={styles.marketDescription}>
        <p>Description:</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nostrum
          repudiandae qui facilis assumenda labore nemo dicta, reprehenderit,
          consequuntur aperiam ea velit quidem optio praesentium itaque nobis
          sapiente eos possimus?
        </p>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Market;
