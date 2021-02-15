import Link from 'next/link';
import styles from '../../styles/Footer.module.sass';

const Footer = () => (
  <footer>
    <div className={styles.container}>
      <Link href="/signup">
        &#169; Ethermarket
      </Link>

    </div>
  </footer>
);

export default Footer;
