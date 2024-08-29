/* eslint-disable react/prop-types */
import { useState } from "react";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import iconRemove from "../assets/images/icon-remove-item.svg";
import carbonNeutral from "../assets/images/icon-carbon-neutral.svg";
import Modal from "./Modal";

const Cart = ({ cartItems, handleRemoveItem, setCartItems, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItemKeys = Object.keys(cartItems);

  // Calculate the total price of all items in the cart
  const cartTotal = cartItemKeys.reduce(
    (total, key) => total + cartItems[key].price * cartItems[key].quantity,
    0
  );

  // Calculate the total number of items (including quantities) in the cart
  const totalItemsCount = cartItemKeys.reduce(
    (count, key) => count + cartItems[key].quantity,
    0
  );

  // Function to handle confirming the order (opens the modal)
  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to reset the cart
  const handleResetCart = () => {
    setIsModalOpen(false);
    // Replace with a function passed from the parent component to reset the cart
    setCartItems({});
  };

  return (
    <div className="bg-white p-6 h-fit lg:-mt-12">
      <h2 className="text-Red red-hat-700 font-bold text-[1.5rem] mb-4">
        Your cart ({totalItemsCount})
      </h2>
      {totalItemsCount === 0 ? (
        <>
          <img src={emptyCart} alt="Empty cart" className="mx-auto mb-4" />
          <p className="text-Rose-500 red-hat-400 text-center">
            Your added items will appear here
          </p>
        </>
      ) : (
        <>
          <ul>
            {cartItemKeys.map((key) => (
              <li
                key={key}
                className="flex justify-between items-center mb-4 border-b border-b-Rose-100 pb-4"
              >
                <div className="flex flex-col">
                  <h3 className="text-Rose-900 red-hat-600">
                    {cartItems[key].name}
                  </h3>
                  <p>
                    <span className="mr-2 text-Red red-hat-700 text-base">
                      {cartItems[key].quantity}x{" "}
                    </span>
                    <span className="text-Rose-400 red-hat-600 font-bold mr-2">
                      @ ${cartItems[key].price}
                    </span>
                    <span className="text-Rose-400 red-hat-700 font-bold">
                      $
                      {(cartItems[key].price * cartItems[key].quantity).toFixed(
                        2
                      )}
                    </span>
                  </p>
                </div>

                {/* Add a button to remove the item from the cart */}
                <button
                  onClick={() => handleRemoveItem(key)}
                  className="text-Rose-500 red-hat-400 underline hover:text-Rose-700 rounded-full border border-Rose-400 p-[2px]"
                >
                  <img src={iconRemove} alt="" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <p className="text-Rose-900 red-hat-400">Order Total</p>
            <p className="red-hat-700 font-bold text-[1.3rem] text-Rose-900">
              ${cartTotal.toFixed(2)}
            </p>
          </div>
        </>
      )}

      {totalItemsCount !== 0 && (
        <>
          <div className="bg-Rose-50 rounded-md px-4 py-2 flex justify-center items-center my-6">
            <img src={carbonNeutral} alt="" />
            <p className="text-Rose-900 red-hat-400">
              This is a{" "}
              <span className="text-Rose-900 red-hat-700 font-bold">
                Carbon-neutral
              </span>{" "}
              delivery
            </p>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="bg-Red flex justify-center items-center text-Rose-50 w-full py-3 rounded-full"
          >
            Confirm Order
          </button>
        </>
      )}

      {isModalOpen && (
        <Modal
          cartItems={cartItems}
          cartTotal={cartTotal}
          handleClose={handleCloseModal}
          handleResetCart={handleResetCart}
          data={data}
        />
      )}
    </div>
  );
};

export default Cart;
