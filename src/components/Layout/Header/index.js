import HeaderCartButton from "./HeaderCartButton";
import image from "../../../assets/meals.jpg";
import styles from "./index.module.css";

const Header = ({ onShowCart }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="buffet" />
      </div>
    </>
  );
};

export default Header;
