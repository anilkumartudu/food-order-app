import { useContext, useState, useEffect } from "react";
import CartIcon from "../../../../assets/CartIcon";
import CartContext from "../../../../store/cart-context";
import styles from "./index.module.css";

const HeaderCartButton = ({ onClick }) => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const [isBtnHighlighted, setIsButtonHighLighted] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setIsButtonHighLighted(true);

    const timer = setTimeout(() => setIsButtonHighLighted(false), 300);

    return () => clearTimeout(timer);
  }, [items]);

  const btnStyles = `${styles.button} ${isBtnHighlighted ? styles.bump : ""}`;

  const numberOfCartItems = items.reduce((acc, currItem) => {
    return acc + currItem.amount;
  }, 0);

  return (
    <button className={btnStyles} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
