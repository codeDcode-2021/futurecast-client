import styles from "../../styles/Nav.module.sass";
import Portis from "@portis/web3";
import Web3 from "web3";

const portis = new Portis("1b0ac6e5-efa2-481a-a7d7-188b24722233", "mainnet");

const Nav = () => {
  const onClick = async () => {
    try {
      await window.web3.currentProvider.enable();
    } catch (e) {
      console.log(e);
    }
  };
  const handlePortis = async () => {
    const web3 = new Web3(portis.provider);
    try {
      await web3.eth.getAccounts((error, accounts) => {
        console.log(accounts);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.nav}>
      <h1 className={styles.logo}>
        <span>Et</span>
        <span>her</span>
        <span>eum</span>
      </h1>
      <ul className={styles.navOptions}>
        <button type="button" onClick={onClick}>
          <li className={styles.signup}>Connect to Wallet</li>
        </button>
        <button type="button" onClick={handlePortis}>
          <li className={styles.signup}>Connect to Portis</li>
        </button>
      </ul>
    </div>
  );
};

export default Nav;
