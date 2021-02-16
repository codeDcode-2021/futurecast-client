import styles from "../../styles/InputField.module.sass";

const InputField = ({
  name,
  placeholder,
  type = "text",
  required = "false",
}) => (
  <div className={styles.formGroup}>
    <input
      className={styles.formField}
      placeholder={placeholder}
      name={name}
      id={name}
      type={type}
      required={required}
    />
    <label htmlFor={name} className={styles.formLabel}>
      {placeholder}
    </label>
  </div>
);

export default InputField;
