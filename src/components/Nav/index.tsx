import Link from 'next/link';
import styles from '../../styles/Nav.module.sass';

const Nav = () => (
  <div className={styles.nav}>
    <h1 className={styles.logo}>
      <span>Et</span>
      <span>her</span>
      <span>eum</span>
    </h1>
    <ul className={styles.navOptions}>
      <button type="button"><li className={styles.signup}>Connect to Wallet</li></button>
    </ul>
  </div>
);

export default Nav;
