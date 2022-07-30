import useInput from "../../../hooks/use-input";
import styles from "./index.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = ({ onSubmit, onCancel }) => {
  let formIsValid = false;

  const {
    value: nameValue,
    isValueValid: isNameValueValid,
    hasError: nameHasError,
    onChangeHandler: onNameChangeHandler,
    onBlurHandler: onNameBlurHandler,
    onReset: onNameReset,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValueValid: isStreetValueValid,
    hasError: streetHasError,
    onChangeHandler: onStreetChangeHandler,
    onBlurHandler: onStreetBlurHandler,
    onReset: onStreetReset,
  } = useInput(isNotEmpty);

  const {
    value: postalValue,
    isValueValid: isPostalValueValid,
    hasError: postalHasError,
    onChangeHandler: onPostalChangeHandler,
    onBlurHandler: onPostalBlurHandler,
    onReset: onPostalReset,
  } = useInput(isSixChars);

  const {
    value: cityValue,
    isValueValid: isCityValueValid,
    hasError: cityHasError,
    onChangeHandler: onCityChangeHandler,
    onBlurHandler: onCityBlurHandler,
    onReset: onCityReset,
  } = useInput(isNotEmpty);

  if (
    isNameValueValid &&
    isStreetValueValid &&
    isPostalValueValid &&
    isCityValueValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    onSubmit({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });
    onNameReset();
    onStreetReset();
    onPostalReset();
    onCityReset();
  };

  const nameControlStyles = `${styles.control} ${
    nameHasError ? styles.invalid : ""
  }`;

  const streetControlStyles = `${styles.control} ${
    streetHasError ? styles.invalid : ""
  }`;

  const postalControlStyles = `${styles.control} ${
    postalHasError ? styles.invalid : ""
  }`;

  const cityControlStyles = `${styles.control} ${
    cityHasError ? styles.invalid : ""
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyles}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={onNameChangeHandler}
          onBlur={onNameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlStyles}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={onStreetChangeHandler}
          onBlur={onStreetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={onPostalChangeHandler}
          onBlur={onPostalBlurHandler}
        />
        {postalHasError && (
          <p>Please enter a valid postal code (6 characters long)!</p>
        )}
      </div>
      <div className={cityControlStyles}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={onCityChangeHandler}
          onBlur={onCityBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
