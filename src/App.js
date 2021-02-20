import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/globals.sass";

import Nav from "./components/Nav";
import Market from "./components/Market";
import MarketGrid from "./components/MarketGrid";
import HeroSection from "./components/HeroSection";
import NewQuestion from "./components/NewQuestion";
import { UserProfile } from "./components/UserProfile";
import EnableWeb3 from "./components/EnableWeb3";
import TransactionComplete from "./components/TransactionComplete";

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

        values.forEach((value) => (total += parseInt(value)));
        let percentage = values.map((value) =>
          total ? parseFloat((value / total) * 100).toFixed(2) : 0
        );

        pubVar[2] = [[...percentage], [...pubVar[2][1]]];
        pubVar["total"] = total
          ? parseFloat(total / 10 ** 18).toFixed(3)
          : total;

        const infoObject = {
          details: { ...pubVar, address: addr },
        };

        return infoObject;
      })
    );

    return markets;
  } catch (e) {
    console.log(e);
  }
};

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [factory, setFactory] = useState(null);
  const [markets, setMarkets] = useState(null);
  const [questionInstance, setQuestionInstance] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const [wallet, setWallet] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(undefined);

  useEffect(() => {
    if (factory && questionInstance)
      getMarkets(factory, questionInstance).then((markets) =>
        setMarkets(markets)
      );
  }, [factory, questionInstance]);

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
            <MarketGrid markets={markets} />
          </Route>
          <Route path="/market/:id">
            <Market
              questionInstance={questionInstance}
              walletAddress={walletAddress}
              showWalletModal={() => showWalletModal()}
              markets={markets}
            />
          </Route>
          <Route path="/new-question">
            <NewQuestion walletAddress={walletAddress} factory={factory} />
          </Route>
          <Route path="/profile">
            <UserProfile walletAddress={walletAddress} markets={markets} />
          </Route>
          <Route path="/transaction">
            <TransactionComplete />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
