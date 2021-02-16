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
  const [markets, setMarkets] = useState(null);

  useEffect(() => {
    getMarkets().then((markets) => setMarkets(markets));
  }, []);

  return (
    <>
      <Nav />
      <Router>
        <Switch>
          <Route path="/" exact>
            <HeroSection />
            <MarketGrid markets={markets} />
          </Route>
          <Route path="/market/:id">
            <Market markets={markets} />
          </Route>
          <Route path="/new-question">
            <NewQuestion />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
