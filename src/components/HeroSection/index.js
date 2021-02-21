import styles from "../../styles/HeroSection.module.sass";

const HeroSection = () => (
  <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.heading}>FutureCast</h1>
      <p className={styles.para}>
        FutureCast is a decentralized market where users can stake on a question and get exciting and high returns. We can provide you more returns with the help of external network staking clients. 

What are you waiting for? Lets stake some Matic with minimal gas fee!🥳
      </p>
    </div>
  </div>
);

export default HeroSection;
