const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

//need to replace this with the user details 

const seedPhrase = 'ritual crane almost reason fox engage pet display dilemma inspire hat vivid';

const rpcEndpoint = 'https://kovan.infura.io/v3/19b85f951b5a4440923fa8f61eb27245';

const provider = new HDWalletProvider(seedPhrase, rpcEndpoint);
const web3 = new Web3(provider);

const info = require('./info.json');


const deploy = async()=>{
  accounts = await web3.eth.getAccounts();
  console.log('Current account address: ', accounts[0]);
  initBal = await web3.eth.getBalance(accounts[0]);
  console.log("Account balance: ", initBal);
  
  
  factory = new web3.eth.Contract(
    info.factoryInterface,
    info.factoryAddress
    );
    
  res = await factory.methods.giveQuestionAddresses().call();
  // console.log(res)

    res.forEach(async (addr)=>{
      
      try{
      console.log(addr)
      question = await new web3.eth.Contract(info.questionInterface, addr)
      mes = await question.getPastEvents(
        'staked',
        {
          filter: {
            _market: [addr],
            _user: [accounts[0]]
          },
          fromBlock: '23400000',
          toBlock:   'latest'
        }
        )
        
        amount = {}  
        
        mes.forEach(async(item)=> {
          // console.log(item.returnValues);
          if(amount[item.returnValues._optionId] === undefined){
            amount[item.returnValues._optionId]
            = parseInt(item.returnValues._amount);
          }
          else{
            amount[item.returnValues._optionId]
            += parseInt(item.returnValues._amount);
          }
        });
        console.log(amount);
    
    // return process.exit(0);
      }catch(e){
        console.log("error here :(");
      }})
};
  
deploy();
