import { useState } from "react";

import InputField from "../InputField";
import styles from "../../styles/NewQuestion.module.sass";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import { useState, useEffect } from "react";

const NewQuestion = () => {
  const initialState = {
    question: "",
    options: ["", "", "Invalid"],
    startDate: Date.now() / 1000,
    bettingEndDate: null,
    eventEndDate: null,
  };

  const [dateTime, setDateTime] = useState(null);
  const [data, setData] = useState(initialState);

  Moment.locale("en");
  momentLocalizer();

  const updateDetails = (e) => {
    const field = e.target.name;

    if (field.substr(0, field.length - 1) === "option") {
      const index = field.substr(-1);
      initialState["options"][index] = e.target.value;
    } else initialState[field] = e.target.value;
    setData(initialState);
  };

  return (
    <div className={styles.newQuestionContainer}>
      <form className={styles.newQuestion}>
        <div className={styles.fieldContainer}>
          <h2 className={styles.heading}>
            <span role="img" aria-label="celebration emoji">
              🥳
            </span>{" "}
            Add your Question
          </h2>
        </div>
        <div className={styles.fieldContainer}>
          <InputField
            name="question"
            placeholder="Question"
            onChange={updateDetails}
            required
          />
        </div>
        <div className={styles.optionContainer}>
          {data.options.map((_, id) =>
            id !== data.options.length - 1 ? (
              <div className={styles.fieldContainer} key={id}>
                <InputField
                  name={`option${id}`}
                  placeholder={`Option ${id + 1}`}
                  onChange={updateDetails}
                  required
                />
              </div>
            ) : (
              <div className={styles.fieldContainer} key={id}>
                <InputField
                  name={`option${id}`}
                  placeholder={data.options[id]}
                  disabled
                  required
                />
              </div>
            )
          )}
        </div>
        <div className={styles.fieldContainer}>
          <DateTimePicker value={dateTime} onChange={handleTimeChange} />
        </div>
        <div className={styles.fieldContainer}>
          <button type="submit" className={styles.addQuestionButton}>
            Create Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewQuestion;
