import Head from 'next/head';
import Link from 'next/link';

import Nav from '../components/Nav';
import InputField from '../components/InputField';
import Container from '../styles/Home.module.sass';
import styles from '../styles/Login.module.sass';
import Footer from '../components/Footer';

const Login = () => (
  <div className={Container.container}>
    <Head>
      <title>Ether Market - Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <form className={styles.container}>
      <div className={styles.fieldContainer}>
        <h2>
          <span role="img" aria-label="celebration emoji">
            😇
          </span>{' '}
          Welcome back!
        </h2>
      </div>
      <div className={styles.fieldContainer}>
        <InputField name="email" placeholder="E-Mail" type="email" required />
      </div>
      <div className={styles.fieldContainer}>
        <InputField
          name="password"
          placeholder="Password"
          type="password"
          required
        />
      </div>
      <div className={styles.fieldContainer}>
        <button type="submit" className={styles.actionButton}>
          Login
        </button>
      </div>
      <div className={styles.actionLinks}>
        <Link href="/signup">
          <p className={styles.actionLink}>create account</p>
        </Link>
        <p className={styles.actionLink}>forgot password?</p>
      </div>
    </form>
    <Footer />
  </div>
);

export default Login;
