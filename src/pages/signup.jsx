import Nav from '../components/Nav';
import InputField from '../components/InputField';
import Container from '../styles/Home.module.sass';
import styles from '../styles/Login.module.sass';
import Footer from '../components/Footer';

const SignUp = () => (
  <div className={Container.container}>
    <head>
      <title>Ether Market - Login</title>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <Nav />
    <form className={styles.container}>
      <div className={styles.fieldContainer}>
        <h2>
          <span role="img" aria-label="celebration emoji">
            🐤
          </span>{' '}
          Let's get you ready for the party!
        </h2>
      </div>
      <div className={styles.fieldContainer}>
        <InputField name="name" placeholder="Name" required />
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
          Sign up!
        </button>
      </div>
      <div className={styles.actionLinks}>
        <a href="/login">
          <p className={styles.actionLink}>login instead</p>
        </a>
      </div>
    </form>
    <Footer />
  </div>
);

export default SignUp;
