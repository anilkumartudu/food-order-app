import { useState } from "react";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart";
import Meals from "./components/Meals";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCartHandler = () => setIsCartVisible(true);

  const hideCartHandler = () => setIsCartVisible(false);

  return (
    <CartProvider>
      {isCartVisible && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
