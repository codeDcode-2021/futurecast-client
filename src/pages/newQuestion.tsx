import Head from 'next/head';

import Nav from '../components/Nav';
import InputField from '../components/InputField';
import Container from '../styles/Home.module.sass';
import styles from '../styles/NewQuestion.module.sass';
import Footer from '../components/Footer';

const newQuestion = () => (
  <div className={Container.container}>
    <Head>
      <title>Ether Market - Add Question</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <form className={styles.newQuestion}>
      <div className={styles.fieldContainer}>
        <h2>
          <span role="img" aria-label="celebration emoji">
            🥳
          </span>{' '}
          Add your Question
        </h2>
      </div>
      <div className={styles.fieldContainer}>
        <InputField name="question" placeholder="Question" required />
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.fieldContainer}>
          <InputField name="option1" placeholder="Option 1" required />
        </div>
        <div className={styles.fieldContainer}>
          <InputField name="option2" placeholder="Option 2" required />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <button type="submit" className={styles.addQuestionButton}>
          Add Question
        </button>
      </div>
    </form>
    <Footer />
  </div>

);

export default newQuestion;
