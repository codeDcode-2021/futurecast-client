import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import styles from "../../styles/Nav.module.sass";

import metalogo from "../../assets/metamask.svg";
import portislogo from "../../assets/portis.svg";
import LoadingAnimation from "../LoadingAnimation";

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
      <Link to="/">
        <h1 className={styles.logo}>
          <span>Future</span>
          <span>Cast</span>
        </h1>
      </Link>
      {!wallet ? (
        <ul className={styles.navOptions}>
          <li>
            <button onClick={onOpenModal}>
              <div className={styles.signup}>
                <span className={styles.emoji}>👛</span>
                <span>Connect to Wallet</span>
              </div>
            </button>
          </li>
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
      ) : walletAddress ? (
        <ul className={styles.navOptions}>
          <li>
            <Link to="/new-question">
              <div className={styles.signup} style={{ marginRight: "8px" }}>
                <span className={styles.emoji}>➕</span>
                <span>Add Question</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <div className={styles.signup}>
                <img
                  className={styles.img}
                  src={wallet === 1 ? metalogo : portislogo}
                  alt={wallet === 1 ? "MetaMask" : "Portis"}
                ></img>
              </div>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.navOptions}>
          <li>
            <div className={styles.signup}>
              <LoadingAnimation height="24px" color="white" />
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
