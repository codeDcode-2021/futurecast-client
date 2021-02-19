import styles from "../../styles/Nav.module.sass";
import Portis from "@portis/web3";
import Web3 from "web3";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";

import metalogo from "../../assets/metamask.svg";
import portislogo from "../../assets/portis.svg";

const portis = new Portis("1b0ac6e5-efa2-481a-a7d7-188b24722233", "kovan", {
  gasRelay: true,
});

const Nav = ({ setWalletAddress, walletAddress }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onClick = () => {
    window.web3.currentProvider
      .enable()
      .then((accounts) => {
        setWalletAddress(accounts[0]);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePortis = async () => {
    const web3 = new Web3(portis.provider);
    try {
      await web3.eth.getAccounts((error, accounts) => {
        console.log(accounts);
        setOpen(false);
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
      {!walletAddress && (
        <ul className={styles.navOptions}>
          <button onClick={onOpenModal}>
            <li className={styles.signup}>Connect to Wallet</li>
          </button>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            showCloseIcon={false}
            aria-labelledby="wallet-connect-popup"
            aria-describedby="a popup to connect crypto wallets to the app"
          >
            <div style={{ padding: "10px", textAlign: "center" }}>
              <div style={{ marginBottom: "30px" }}>
                <h1>EtherMarket</h1>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h4>Connect your wallet</h4>
              </div>
              <button className={styles.btn} type="button" onClick={onClick}>
                <span className={styles.btntxt}>MetaMask</span>
                <span className={styles.btnlogo}>
                  <img width="24px" src={metalogo} alt={"metamask"} />
                </span>
              </button>
              <br />
              <button
                className={styles.btn}
                type="button"
                onClick={handlePortis}
              >
                <span className={styles.btntxt}>Portis</span>
                <span className={styles.btnlogo}>
                  <img width="18px" src={portislogo} alt="portis" />
                </span>
              </button>
            </div>
          </Modal>
        </ul>
      )}
    </div>
  );
};

export default Nav;
