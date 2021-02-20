import { useEffect, useState } from "react";
import styles from "../../styles/UserProfile.module.sass";

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
  const [myRecents, setMyRecents] = useState([]);

  // const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    console.log(myRecents);
  }, [myRecents]);

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

  useEffect(() => {
    if (markets && walletAddress) {
      markets.forEach((item) => {
        // console.log(item.details.address);
        const question = new web3.eth.Contract(
          info.questionInterface,
          item.details.address
        );
        mes(walletAddress, question, item.details.address)
          .then((obj) => {
            let amount = [];
            obj.forEach((item) => {
              // console.log(item);
              amount[0] = item.address;
              const optid = parseInt(item.returnValues._optionId) + 1;
              if (amount[optid] === undefined) {
                amount[optid] = parseInt(item.returnValues._amount);
              } else {
                amount[optid] += parseInt(item.returnValues._amount);
              }
            });
            // console.log(amount);
            if (amount.length !== 0) {
              // console.log(amount);
              setMyRecents([...myRecents, amount]);
            }
          })
          .catch((err) => console.log(err));
      });
    }
  }, [markets, walletAddress]);

  return walletAddress ? (
    <>
      <div>
        <div>
          <h2>Dashboard</h2>
          <div>Current Address :{walletAddress}</div>
          <div>Current balance :{balance}</div>
          <br />
          <h4>Recent activities</h4>
          <b />
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
