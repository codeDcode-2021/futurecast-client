import Trade from 'components/Trade';
import Nav from '../../../components/Nav';
import styles from '../../../styles/Market.module.sass';
import Container from '../../../styles/Home.module.sass';


const Market = () => (
  <div className={Container.container}>
    <head>
      <title>Ether Market - Market</title>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <Nav />
    <div className={styles.market}>
      <div className={styles.questionContainer}>
        <div className={styles.questionIconContainer}>
          <img
            src="https://img.icons8.com/bubbles/100/000000/question-mark.png"
            alt="question mark icon"
            className={styles.questionIcon}
          />
        </div>
        <p className={styles.question}>
          Will Joe Biden be President of the USA on March 1, 2021?
        </p>
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
      <Trade />
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
  </div>
);

export const getServerSideProps = async (context) => {
  const { id } = context.params ? context.params : { id: null };

  const props = {
    id,
  };

  return { props };
};

export default Market;
