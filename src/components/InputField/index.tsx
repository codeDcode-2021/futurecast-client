import styles from '../../styles/InputField.module.sass';

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const InputField = ({ name, placeholder, type, required }: Props) => (
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

InputField.defaultProps = {
  type: 'text',
  required: false,
};

export default InputField;
