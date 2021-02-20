import { useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import InputField from "../InputField";
import styles from "../../styles/NewQuestion.module.sass";
import LoadingAnimation from "../LoadingAnimation";

const NewQuestion = ({ walletAddress, factory }) => {
  const [creatingQuestion, setCreatingQuestion] = useState(false);
  const history = useHistory();

  const initialState = {
    question: "",
    options: ["", "", "Invalid"],
    startDate: Date.now() / 1000,
    bettingEndDate: null,
    eventEndDate: null,
  };

  const [data, setData] = useState(initialState);

  const updateDetails = (e) => {
    const field = e.target.name;
    const state = data;

    if (field.substr(0, field.length - 1) === "option") {
      const index = field.substr(-1);
      state["options"][index] = e.target.value;
    } else state[field] = e.target.value;

    setData({ ...state });
  };

  const createNewQuestion = (e) => {
    const state = { ...data };
    state.options.pop();

    factory.methods
      .createQuestion(
        state.question,
        state.options,
        state.bettingEndDate,
        state.eventEndDate
      )
      .send({
        from: walletAddress,
      })
      .then((tx) =>
        history.push({
          pathname: "/transaction",
          state: {
            newQuestion: true,
            response: tx,
            details: state,
          },
        })
      )
      .catch((err) =>
        history.push({
          pathname: "/transaction",
          state: {
            newQuestion: true,
            response: { ...err, status: false, from: walletAddress },
            details: state,
          },
        })
      );

    setCreatingQuestion(true);
  };

  return !creatingQuestion && walletAddress ? (
    <div className={styles.newQuestionContainer}>
      <form
        className={styles.newQuestion}
        onSubmit={(e) => {
          e.preventDefault();
          createNewQuestion(e);
        }}
      >
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
                  defaultValue={data.options[id]}
                  required
                />
              </div>
            ) : (
              <div className={styles.fieldContainer} key={-1}>
                <InputField
                  name={`option${id}`}
                  placeholder={`Option ${id + 1}`}
                  defaultValue={data.options[id]}
                  disabled
                  required
                />
              </div>
            )
          )}
        </div>
        <div className={styles.addOption}>
          <button
            onClick={(e) => {
              let state = data;
              if (state.options.length < 6) {
                state.options.pop();
                state.options.push("");
                state.options.push("Invalid");

                setData({ ...state });
              }
            }}
            type="button"
          >
            Add option
          </button>
          <button
            onClick={(e) => {
              let state = data;
              if (state.options.length > 3) {
                state.options.pop();
                state.options.pop();
                state.options.push("Invalid");

                setData({ ...state });
              }
            }}
            type="button"
          >
            Remove option
          </button>
        </div>
        <div className={styles.optionContainer}>
          <div className={styles.datePickerContainer}>
            <label>Betting end date</label>
            <div>
              <DatePicker
                selected={
                  data.bettingEndDate
                    ? new Date(data.bettingEndDate * 1000)
                    : null
                }
                name="bettingEndTime"
                onChange={(date) => {
                  const state = data;
                  state.bettingEndDate = Date.parse(date) / 1000;

                  if (state.bettingEndDate <= state.eventEndDate) {
                    setData({ ...state });
                  } else {
                    state.eventEndDate = null;
                    setData({ ...state });
                  }
                }}
                minDate={
                  data.startDate ? new Date(data.startDate * 1000) : null
                }
                className={styles.customInput}
                dateFormat="d / MM / yyyy    h:mm aa"
                showTimeSelect
                placeholderText="Choose Betting End Date"
                required
              />
            </div>
          </div>
          <div className={styles.datePickerContainer}>
            <label>Event end date</label>
            <div>
              <DatePicker
                selected={
                  data.eventEndDate ? new Date(data.eventEndDate * 1000) : null
                }
                onChange={(date) => {
                  const state = data;
                  state.eventEndDate = Date.parse(date) / 1000;
                  setData({ ...state });
                }}
                minDate={
                  data.bettingEndDate
                    ? new Date(data.bettingEndDate * 1000)
                    : null
                }
                disabled={!data.bettingEndDate}
                className={styles.customInput}
                dateFormat="d / MM / yyyy    h:mm aa"
                showTimeSelect
                placeholderText="Choose Betting End Date"
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <button type="submit" className={styles.addQuestionButton}>
            Create Question
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className={styles.loadingAnimationContainer}>
      <div className={styles.pleaseWait}>
        <LoadingAnimation />
        {!walletAddress ? (
          <p>Please connect to a wallet.</p>
        ) : (
          creatingQuestion && <p>Please wait, while we create your question</p>
        )}
      </div>
    </div>
  );
};

export default NewQuestion;
