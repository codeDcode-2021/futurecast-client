import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles/UserProfile.module.sass";
import LoadingAnimation from "../LoadingAnimation";
import MarketGrid from "../MarketGrid";

const info = require("../EnableWeb3/info.json");

const getBalance = async (web3, walletAddress) => {
  return await web3.eth.getBalance(walletAddress);
};

const mes = async (walletAddress, question, marketaddress) => {
  return await question.getPastEvents("staked", {
    filter: {
      _market: [marketaddress],
      _user: [walletAddress],
    },
    fromBlock: "23400000",
    toBlock: "latest",
  });
};

export const UserProfile = ({ walletAddress, markets, factory, web3 }) => {
  const [balance, setBalance] = useState(0);
  const [myRecents, setMyRecents] = useState(null);
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
  }, [web3, factory, walletAddress]);

  useEffect(() => {
    if (markets && walletAddress) {
      let transactionDetails = {};
      const marketAddresses = [];
      markets.forEach((item, id) => {
        const question = new web3.eth.Contract(
          info.questionInterface,
          item.details.address
        );

        mes(walletAddress, question, item.details.address)
          .then((obj) => {
            obj.forEach((item) => {
              const { _amount, _market, _optionId } = { ...item.returnValues };

              if (!transactionDetails[_market]) {
                marketAddresses.push(_market);
                transactionDetails[_market] = {};
              }

              if (!transactionDetails[_market][_optionId])
                transactionDetails[_market][_optionId] = parseInt(_amount);
              else transactionDetails[_market][_optionId] += parseInt(_amount);
            });
            return transactionDetails;
          })
          .then((transactionDetails) => {
            if (id === markets.length - 1) {
              const recentMarkets = markets.filter((market) => {
                const marketAddresses = Object.keys(transactionDetails);
                for (let i = 0; i < marketAddresses.length; i++) {
                  if (market.details.address === marketAddresses[i]) {
                    market.details["options"] =
                      transactionDetails[marketAddresses[i]];
                    return true;
                  }
                }
                return false;
              });
              setMyRecents([...recentMarkets]);
            }
          })
          .catch((err) => console.log(err));
      });
    }
  }, [markets, walletAddress, web3]);

  return walletAddress ? (
    <>
      <div className={styles.container}>
        <h2>Dashboard</h2>
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>
            Current balance: {parseFloat(balance / 10 ** 18).toFixed(3)} ether
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
