import web3 from "./web3";
import info from "./info.json";

const factory = new web3.eth.Contract(
  info.factoryInterface,
  info.factoryAddress
);

export default factory;
