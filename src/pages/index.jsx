import React from 'react';


import Nav from '../components/Nav';
import styles from '../styles/Home.module.sass';
import MarketGrid from '../components/MarketGrid';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

import getFactory from '../src/integ/factory';
import questionInstance from '../src/integ/question';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markets: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

export default function Home(props) {
  const { markets } = props;

  return (
    <div className={styles.container}>
      <head>
        <title>Ether Market - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Nav />
      <HeroSection />
      <MarketGrid markets={markets} />
      <Footer />
    </div>
  );
}
  loadData = async () => {
    try {
      const factory = await getFactory();
      const questionAddresses = await factory.methods.giveQuestionAddresses().call();

      const markets = [];

      questionAddresses.forEach(async (addr) => {
        const thisQuestion = await questionInstance(addr);
        const pubVar = await thisQuestion.methods.publicVariables().call();

        const infoObject = {
          details: pubVar,
          questionInstance: thisQuestion,
        };

        markets.push(infoObject);
      });
      console.log(markets);
      this.setState({ markets });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { markets } = this.state;
    return (
      <div className={styles.container}>
        <head>
          <title>Ether Market - Home</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <Nav />
        <HeroSection />
        <MarketGrid markets={markets || []} />
        <Footer />
      </div>
    );
  }
}