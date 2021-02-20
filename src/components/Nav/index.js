import styles from "../../styles/Nav.module.sass";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";

import metalogo from "../../assets/metamask.svg";
import portislogo from "../../assets/portis.svg";

const Nav = ({ setWallet, setShowWalletModal, wallet, walletAddress }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    const onOpenModal = () => setOpen(true);
    setShowWalletModal(() => onOpenModal);
  }, [setShowWalletModal]);

  return (
    <div className={styles.nav}>
      <h1 className={styles.logo}>
        <span>Et</span>
        <span>her</span>
        <span>eum</span>
      </h1>
      {!walletAddress ? (
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
              <div style={{ marginBottom: "15px" }}>
                <h4>Connect your wallet</h4>
              </div>
              <button
                className={styles.btn}
                type="button"
                onClick={() => {
                  setWallet(1);
                  setOpen(false);
                }}
              >
                <span className={styles.btntxt}>MetaMask</span>
                <span className={styles.btnlogo}>
                  <img width="24px" src={metalogo} alt={"metamask"} />
                </span>
              </button>
              <br />
              <button
                className={styles.btn}
                type="button"
                onClick={() => {
                  setWallet(2);
                  setOpen(false);
                }}
              >
                <span className={styles.btntxt}>Portis</span>
                <span className={styles.btnlogo}>
                  <img width="18px" src={portislogo} alt="portis" />
                </span>
              </button>
            </div>
          </Modal>
        </ul>
      ) : (
        <ul className={styles.navOptions}>
          <li className={styles.signup}>
            <img
              className={styles.img}
              src={wallet === 1 ? metalogo : portislogo}
              alt={wallet === 1 ? "MetaMask" : "Portis"}
            ></img>
            <span>Connected to {wallet === 1 ? "MetaMask" : "Portis"}</span>
          </li>
          {/* <li>
            <MiniProfile walletAddress={walletAddress} />
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default Nav;
