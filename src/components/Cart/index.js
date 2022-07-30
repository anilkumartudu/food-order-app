import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import styles from "./index.module.css";

const Cart = ({ onClose }) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [hasError, setHasError] = useState(null);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

  const isCartEmpty = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => cartCtx.removeItem(id);

  const cartItemAddHandler = (item) => cartCtx.addItem({ ...item, amount: 1 });

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orders.json`,
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Please try again later!");
      }
    } catch (error) {
      setIsSubmitting(false);
      setHasError(error.message);
      return;
    }

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  if (hasError) {
    return (
      <Modal onClose={onClose}>
        <p>{hasError}</p>
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !didSubmit && (
        <>
          {cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout onSubmit={submitOrderHandler} onCancel={onClose} />
          )}
          {!isCheckout && (
            <div className={styles.actions}>
              <button className={styles["button--alt"]} onClick={onClose}>
                Close
              </button>
              {isCartEmpty && (
                <button className={styles.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}
      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && didSubmit && (
        <>
          <p>Successfully sent the order!</p>
          <div className={styles.actions}>
            <button className={styles["button--alt"]} onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
