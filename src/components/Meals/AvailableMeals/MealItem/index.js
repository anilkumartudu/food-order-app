import { useContext } from "react";
import CartContext from "../../../../store/cart-context";
import MealItemForm from "./MealItemForm";
import styles from "./index.module.css";

const MealItem = ({ id, name, description, price }) => {
  const cartCtx = useContext(CartContext);

  const customizedPrice = `₹${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{customizedPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
