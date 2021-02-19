import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/globals.sass";

import factory from "./contracts/factory";
import questionInstance from "./contracts/question";

import Nav from "./components/Nav";
import Market from "./components/Market";
import MarketGrid from "./components/MarketGrid";
import HeroSection from "./components/HeroSection";
import NewQuestion from "./components/NewQuestion";

const getMarkets = async () => {
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
          total ? (value / total) * 100 : 0
        );

        pubVar[2] = [[...percentage], [...pubVar[2][1]]];
        pubVar["total"] = total;

        const infoObject = {
          details: { ...pubVar, address: addr },
          questionInstance: thisQuestion,
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
  const [walletAddress, setWalletAddress] = useState(null);
  const [markets, setMarkets] = useState(null);

  useEffect(() => {
    getMarkets().then((markets) => setMarkets(markets));
  }, []);

  return (
    <>
      <Nav setWalletAddress={setWalletAddress} walletAddress={walletAddress} />
      <Router>
        <Switch>
          <Route path="/" exact>
            <HeroSection />
            <MarketGrid markets={markets} />
          </Route>
          <Route path="/market/:id">
            <Market markets={markets} walletAddress={walletAddress} />
          </Route>
          <Route path="/new-question">
            <NewQuestion walletAddress={walletAddress} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
