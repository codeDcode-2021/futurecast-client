import InputField from "../InputField";
import styles from "../../styles/NewQuestion.module.sass";

const NewQuestion = () => (
  <form className={styles.newQuestion}>
    <div className={styles.fieldContainer}>
      <h2>
        <span role="img" aria-label="celebration emoji">
          🥳
        </span>{" "}
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
);

export default NewQuestion;
