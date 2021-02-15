import styles from '../../styles/HeroSection.module.sass';

const HeroSection = () => (
  <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.heading}>Lorem ipsum dolor sit</h1>
      <p className={styles.para}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
        temporibus aliquam sed tempora unde maiores officiis ab soluta nesciunt
        velit fugiat minima minus, reiciendis libero facere quibusdam nostrum
        fugit. Omnis?
      </p>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <input
            type="input"
            className={styles.formField}
            placeholder="E-Mail"
            name="email"
            id="email"
            required
          />
          <label htmlFor="email" className={styles.formLabel}>
            E-Mail
          </label>
          <button type="button" className={styles.signup}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
