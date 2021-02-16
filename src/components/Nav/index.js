import styles from "../../styles/Nav.module.sass";

const Nav = ({ web3 }) => {
  const onClick = async () => {
    try {
      await window.web3.currentProvider.enable();
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
      </ul>
    </div>
  );
};

export default Nav;
