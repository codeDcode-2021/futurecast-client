import Web3 from "web3";

const enableWeb3 = () => {
  let { web3 } = window;

  const providerURL =
    "https://kovan.infura.io/v3/19b85f951b5a4440923fa8f61eb27245";

  if (web3 !== undefined) {
    web3 = new Web3(window.ethereum);
    console.log(web3);
  } else {
    const provider = new Web3.providers.HttpProvider(providerURL);
    web3 = new Web3(provider);
  }

  return web3;
};

const web3 = enableWeb3();

export default web3;
