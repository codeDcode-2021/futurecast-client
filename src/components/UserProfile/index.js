import { useEffect, useState } from "react";
import styles from "../../styles/UserProfile.module.sass";

export const UserProfile = ({ walletAddress, markets, factory, web3 }) => {
  console.log("Current account address: ", walletAddress);

  const initBal = web3.eth.getBalance(walletAddress);
  console.log("Account balance: ", initBal);

  const [addressList, setAddressList] = useState([]);

  let res = null;
  const something = async () => {
    res = await factory.methods.giveQuestionAddresses().call();
  };

  useEffect(() => {
    console.log(res);
  }, [res]);

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
  const shortaddress = `${walletAddress.substring(
    0,
    5
  )}...${walletAddress.substring(
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
