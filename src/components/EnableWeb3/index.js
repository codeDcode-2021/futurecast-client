import Web3 from "web3";
import Portis from "@portis/web3";
import { useEffect, useState } from "react";

import info from "./info.json";

const portis = new Portis("1b0ac6e5-efa2-481a-a7d7-188b24722233", "kovan");

const factory = (web3) =>
  new web3.eth.Contract(info.factoryInterface, info.factoryAddress);

const questionInstance = (web3) => {
  return () => async (deployedAddress) => {
    return await new web3.eth.Contract(info.questionInterface, deployedAddress);
  };
};

const EnableWeb3 = ({
  wallet,
  setWallet,
  setWalletAddress,
  setFactory,
  setQuestionInstance,
}) => {
  const [web3, setWeb3] = useState(undefined);

  useEffect(() => {
    const providerURL =
      "https://kovan.infura.io/v3/19b85f951b5a4440923fa8f61eb27245";

    if (wallet === 1 && window.web3 !== undefined) {
      setWeb3(new Web3(window.ethereum));
    } else if (wallet === 2) {
      setWeb3(new Web3(portis.provider));
    } else {
      const provider = new Web3.providers.HttpProvider(providerURL);
      setWeb3(new Web3(provider));
    }
  }, [wallet]);

  useEffect(() => {
    if (web3 !== undefined) {
      if (wallet === 1) {
        window.web3.currentProvider
          .enable()
          .then((accounts) => {
            setWalletAddress(accounts[0]);
          })
          .catch((err) => console.log(err));
      } else if (wallet === 2) {
        web3.eth
          .getAccounts()
          .then((accounts) => setWalletAddress(accounts[0]))
          .catch((err) => {
            console.log(err);
            setWallet(0);
          });
      }

      setFactory(factory(web3));
      const question = questionInstance(web3);
      setQuestionInstance(question);
    }
  }, [
    web3,
    wallet,
    setWalletAddress,
    setWallet,
    setFactory,
    setQuestionInstance,
  ]);

  return <></>;
};

export default EnableWeb3;
