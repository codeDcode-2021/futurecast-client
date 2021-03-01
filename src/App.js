import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/globals.sass";

import info from "./components/EnableWeb3/info.json";

import Nav from "./components/Nav";
import Market from "./components/Market";
import MarketGrid from "./components/MarketGrid";
import HeroSection from "./components/HeroSection";
import NewQuestion from "./components/NewQuestion";
import { UserProfile } from "./components/UserProfile";
import EnableWeb3 from "./components/EnableWeb3";
import TransactionComplete from "./components/TransactionComplete";
import Footer from "./components/Footer";

const getMarkets = async (factory, questionInstance) => {
  try {
    const questionAddresses = await factory.methods
      .giveQuestionAddresses()
      .call();

    const markets = Promise.all(
      questionAddresses.map(async (addr) => {
        const thisQuestion = await questionInstance(addr);
        const pubVar = await thisQuestion.methods.publicVariables().call();

        let details = [...pubVar[3]];
        details.push("Invalid");

        pubVar[3] = [...details];

        let values = [...pubVar[2][0]];
        let total = 0;

        let reportingTotal = 0;
        let reportingValues = [...pubVar[2][1]];

        values.forEach((value) => (total += parseInt(value)));
        reportingValues.forEach((value) => (reportingTotal += parseInt(value)));

        let max = reportingValues.sort((a, b) => parseInt(b) - parseInt(a));
        max = max[0];

        max = reportingValues.findIndex((elt) => elt === max);

        let percentage = values.map((value) =>
          total ? parseFloat((value / total) * 100).toFixed(2) : 0
        );

        let resolvedPercentage = (reportingTotal / total) * 100;

        pubVar[2] = [[...percentage], [...pubVar[2][1]]];
        pubVar["total"] = total
          ? parseFloat(total / 10 ** 18).toFixed(3)
          : total;

        const infoObject = {
          details: { ...pubVar, address: addr, resolvedPercentage, max },
        };

        return infoObject;
      })
    );

    return markets;
  } catch (e) {
    console.log(e);
  }
};

const mes = async (walletAddress, question, marketaddress) => {
  return await question.getPastEvents("staked", {
    filter: {
      _market: [marketaddress],
      _user: [walletAddress],
    },
    fromBlock: "10764030",
    toBlock: "latest",
  });
};

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [factory, setFactory] = useState(null);
  const [markets, setMarkets] = useState(null);
  const [questionInstance, setQuestionInstance] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [myRecents, setMyRecents] = useState(null);

  const [wallet, setWallet] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(undefined);

  useEffect(() => {});

  useEffect(() => {
    if (factory && questionInstance)
      getMarkets(factory, questionInstance).then((markets) =>
        setMarkets(markets)
      );
  }, [factory, questionInstance]);

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
              const { address } = { ...item };

              if (!transactionDetails[address]) {
                marketAddresses.push(_market);
                transactionDetails[address] = {};
              }

              if (!transactionDetails[address][_optionId])
                transactionDetails[address][_optionId] = parseInt(_amount);
              else transactionDetails[address][_optionId] += parseInt(_amount);
            });
            return transactionDetails;
          })
          .then((transactionDetails) => {
            if (id === markets.length - 1) {
              setMyRecents({ ...transactionDetails });
            }
          })
          .catch((err) => console.log(err));
      });
    }
  }, [markets, walletAddress, web3]);

  return (
    <>
      <EnableWeb3
        web3={web3}
        setWeb3={setWeb3}
        setFactory={setFactory}
        setQuestionInstance={setQuestionInstance}
        setWalletAddress={setWalletAddress}
        wallet={wallet}
        setWallet={setWallet}
      />
      <Router>
        <Nav
          setWallet={setWallet}
          wallet={wallet}
          walletAddress={walletAddress}
          setShowWalletModal={setShowWalletModal}
        />
        <Switch>
          <Route path="/" exact>
            <HeroSection />
            <MarketGrid markets={markets} text="Popular Markets" />
          </Route>
          <Route path="/market/:id">
            <Market
              questionInstance={questionInstance}
              walletAddress={walletAddress}
              showWalletModal={() => showWalletModal()}
              markets={markets}
              myRecents={myRecents}
            />
          </Route>
          <Route path="/new-question">
            <NewQuestion walletAddress={walletAddress} factory={factory} />
          </Route>
          <Route path="/profile">
            <UserProfile
              walletAddress={walletAddress}
              recents={myRecents}
              markets={markets}
              web3={web3}
            />
          </Route>
          <Route path="/transaction">
            <TransactionComplete />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
