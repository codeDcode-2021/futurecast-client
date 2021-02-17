import InputField from "../InputField";
import styles from "../../styles/NewQuestion.module.sass";
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import { useState,useEffect } from "react";


const NewQuestion = () => { 


const [dateTime,setDateTime]=useState(null);

Moment.locale('en')
momentLocalizer();

useEffect(() => console.log(dateTime), [dateTime]);

const handleTimeChange=datetime=>{
  setDateTime(datetime);
}
  return(
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
      <div className={styles.fieldContainer} >
  
        <DateTimePicker value={dateTime} onChange={handleTimeChange} />
      
      </div>
    </div>
    <div className={styles.fieldContainer}>
      <button type="submit" className={styles.addQuestionButton}>
        Add Question
      </button>
    </div>
  </form>
)};

export default NewQuestion;
