import { useEffect, useState } from "react";
import styles from "../../styles/UserProfile.module.sass";

const getBalance = async (web3, walletAddress) => {
  return await web3.eth.getBalance(walletAddress);
};

export const UserProfile = ({ walletAddress, factory, web3 }) => {
  const [balance, setBalance] = useState(0);
  // const [addressList, setAddressList] = useState([]);

  // if (
  //   web3 !== undefined &&
  //   walletAddress !== undefined &&
  //   walletAddress !== null
  // ) {
  //   const initBal = async () => {
  //     return await web3.eth.getBalance(walletAddress);
  //   };
  //   initBal().then((response) => {
  //     console.log(response);
  //     // setBalance(parseInt(response));
  //   });

  //   const getAllAddress = async () => {
  //     return await factory.methods.giveQuestionAddresses().call();
  //   };
  //   getAllAddress().then((res) => {
  //     console.log(res);
  //     // setAddressList(res);
  //   });
  // }

  useEffect(() => {
    if (walletAddress) {
      getBalance(web3, walletAddress)
        .then((balance) => setBalance(balance))
        .catch((err) => console.log(err));
    }
  }, [web3, factory, walletAddress]);

  return walletAddress ? (
    <>
      <div>
        <div>
          <h2>Dashboard</h2>
          <div>Current Address :{walletAddress}</div>
          <div>Current balance :{balance}</div>
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
