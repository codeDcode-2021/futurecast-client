import styles from "../../styles/UserProfile.module.sass";

export const UserProfile = ({ walletAddress, markets }) => {
  return walletAddress ? (
    <>
      <div>
        <div>
          <h2>Dashboard</h2>
        </div>
      </div>
    </>
  ) : (
    <p>Please connect to a wallet.</p>
  );
};

export const MiniProfile = ({ walletAddress }) => {
  const shortaddress = `${walletAddress.substring(0,5)}...${walletAddress.substring(
    walletAddress.length - 4,
    walletAddress.length
  )}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.textwrapper}>
        <div className={styles.minihead}>Personal wallet</div>
        <div className={styles.shortaddress}>{shortaddress}</div>
      </div>
    </div>
  );
};
