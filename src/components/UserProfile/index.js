import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles/UserProfile.module.sass";
import LoadingAnimation from "../LoadingAnimation";
import MarketGrid from "../MarketGrid";

const getBalance = async (web3, walletAddress) => {
  return await web3.eth.getBalance(walletAddress);
};

export const UserProfile = ({ walletAddress, recents, markets, web3 }) => {
  const [myRecents, setMyRecents] = useState(null);
  const [balance, setBalance] = useState(0);

  const history = useHistory();

  if (!walletAddress) {
    history.push({
      pathname: "/",
    });
  }

  useEffect(() => {
    if (walletAddress) {
      getBalance(web3, walletAddress)
        .then((balance) => setBalance(balance))
        .catch((err) => console.log(err));
    }
  }, [web3, walletAddress]);

  useEffect(() => {
    if (markets && recents) {
      const recentMarkets = markets.filter((market) => {
        const marketAddresses = Object.keys(recents);
        for (let i = 0; i < marketAddresses.length; i++) {
          if (market.details.address === marketAddresses[i]) {
            market.details["options"] = recents[marketAddresses[i]];
            return true;
          }
        }
        return false;
      });
      setMyRecents([...recentMarkets]);
    }
  }, [markets, recents]);

  return walletAddress ? (
    <>
      <div className={styles.container}>
        <h2>Dashboard</h2>
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>
            Current balance: {parseFloat(balance / 10 ** 18).toFixed(3)} Matic
          </p>
        </div>
        <br />
        <b />
      </div>
      <MarketGrid markets={myRecents} text="Your recent transactions" />
    </>
  ) : (
    <div className={styles.loadingAnimationContainer}>
      <div className={styles.pleaseWait}>
        <LoadingAnimation />
        <p>Please connect to a wallet.</p>
      </div>
    </div>
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
