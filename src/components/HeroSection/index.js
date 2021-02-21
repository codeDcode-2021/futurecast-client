import styles from "../../styles/HeroSection.module.sass";

const HeroSection = () => (
  <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.heading}>SEER</h1>
      <p className={styles.para}>
        Seers is a decentralized market where users can stake on a question and
        get exciting and cool returns. Well, how we are different from Augur? We
        can provide you significantly more returns as we stake on matic staking
        manager as well as some other clients. What are you waiting for? Lets
        stake some Matic! 🥳
      </p>
    </div>
  </div>
);

export default HeroSection;
