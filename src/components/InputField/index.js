import styles from "../../styles/InputField.module.sass";

const InputField = ({
  name,
  placeholder,
  type = "text",
  required = "false",
  onChange,
  disabled = false,
  defaultValue = "",
}) => (
  <div className={styles.formGroup}>
    <input
      className={styles.formField}
      placeholder={placeholder}
      name={name}
      id={name}
      type={type}
      required={required}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
    />
    <label htmlFor={name} className={styles.formLabel} aria-disabled={true}>
      {placeholder}
    </label>
  </div>
);

export default InputField;
