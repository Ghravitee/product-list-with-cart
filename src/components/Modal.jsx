import iconConfirmed from "../assets/images/icon-order-confirmed.svg";

/* eslint-disable react/prop-types */
// Modal Component

const Modal = ({
  cartItems,
  cartTotal,
  //   handleClose,
  handleResetCart,
  data,
}) => {
  const cartItemKeys = Object.keys(cartItems);

  // Function to find the item details by name from the data
  const findItemByName = (itemName) => {
    return data.find((item) => item.name === itemName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <img src={iconConfirmed} alt="Order Confirmed" />
        <h2 className="text-Rose-900 red-hat-700 font-bold text-[1.5rem] lg:text-[2rem] mt-4">
          Order Confirmed
        </h2>
        <p className="red-hat-400 text-Rose-500 mb-6">
          We hope you enjoy your food!
        </p>
        <ul className="bg-Rose-50 rounded-md px-4 py-4">
          {cartItemKeys.map((key) => {
            const itemDetails = findItemByName(cartItems[key].name);
            return (
              <li
                key={key}
                className="flex justify-between items-center mb-4 border-b border-b-Rose-100 pb-4"
              >
                <div className="flex justify-center items-center gap-2">
                  {itemDetails && (
                    <picture className="relative w-12 h-12">
                      <img
                        src={itemDetails.image.thumbnail}
                        alt={itemDetails.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </picture>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-Rose-900 red-hat-600 text-sm">
                      {cartItems[key].name}
                    </h3>
                    <p>
                      <span className="mr-2 text-Red red-hat-700 text-sm">
                        {cartItems[key].quantity}x{" "}
                      </span>
                      <span className="text-Rose-400 red-hat-600 font-bold mr-2 text-sm">
                        @ ${cartItems[key].price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-Rose-900 red-hat-700 font-bold text-sm">
                  ${(cartItems[key].price * cartItems[key].quantity).toFixed(2)}
                </p>
              </li>
            );
          })}
          <div className="flex justify-between items-center mt-6">
            <p className="text-Rose-900 red-hat-400 text-sm">Order Total</p>
            <p className="red-hat-700 font-bold text-[1.3rem] lg:text-[1.5rem] text-Rose-900">
              ${cartTotal.toFixed(2)}
            </p>
          </div>
        </ul>

        {/* <button
            onClick={handleClose}
            className="bg-Rose-500 text-white py-2 px-4 rounded-md"
          >
            Close
          </button> */}
        <button
          onClick={handleResetCart}
          className="bg-Red text-white py-2 px-4 rounded-full w-full"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;
