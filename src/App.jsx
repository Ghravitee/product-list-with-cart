import { useState, useEffect } from "react";
import iconCart from "./assets/images/icon-add-to-cart.svg";
import Cart from "./components/Cart";
import increment from "./assets/images/icon-increment-quantity.svg";
// import decrement from "./assets/images/icon-decrement-quantity.svg";

function App() {
  const [data, setData] = useState([]);
  const [startItems, setStartItems] = useState({}); // Track start state for each item
  const [cartItems, setCartItems] = useState({});

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((myJson) => setData(myJson));
  };

  useEffect(() => {
    getData();
  }, []);

  const startBuy = (itemName) => {
    setStartItems((prevStartItems) => ({
      ...prevStartItems,
      [itemName]: true,
    }));
  };

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[item.name]) {
        newCartItems[item.name].quantity++;
      } else {
        newCartItems[item.name] = { ...item, quantity: 1 };
      }
      return newCartItems;
    });
  };

  const handleRemoveFromCart = (item) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[item.name]) {
        newCartItems[item.name].quantity--;
        if (newCartItems[item.name].quantity === 0) {
          delete newCartItems[item.name];
          // Optionally reset the start state if the item is removed completely
          setStartItems((prevStartItems) => ({
            ...prevStartItems,
            [item.name]: false,
          }));
        }
      }
      return newCartItems;
    });
  };

  const handleRemoveItem = (itemName) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      delete newCartItems[itemName];
      // Optionally reset the start state if the item is removed completely
      setStartItems((prevStartItems) => ({
        ...prevStartItems,
        [itemName]: false,
      }));
      return newCartItems;
    });
  };

  return (
    <main className="bg-Rose-50 lg:min-h-screen p-8">
      <div className="max-w-[80rem] mx-auto">
        <h1 className="red-hat-700 text-Rose-900 font-bold text-[2rem] mb-6">
          Desserts
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-start-1 col-end-3">
            {data.map((item, index) => (
              <div key={index} className="">
                <picture className={`relative `}>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={item.image.desktop}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={item.image.tablet}
                  />
                  <source
                    media="(min-width: 480px)"
                    srcSet={item.image.mobile}
                  />
                  <img
                    src={item.image.mobile}
                    alt={item.name}
                    className={`${
                      startItems[item.name] ? "border border-Red" : ""
                    } w-full object-cover rounded-lg`}
                  />

                  {startItems[item.name] ? (
                    <div className="absolute w-[50%] sm:w-[60%] lg:w-[70%] -bottom-4 left-0 right-0 mx-auto bg-Red flex px-4 py-2 justify-center items-center gap-4 rounded-full">
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="bg-Red w-5 h-5 border group border-white rounded-full flex justify-center items-center mr-auto hover:bg-white"
                      >
                        <svg
                          className="hover:cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="2"
                          viewBox="0 0 10 2"
                        >
                          <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                        </svg>
                      </button>
                      <p className="text-white">
                        {cartItems[item.name]?.quantity || 0}
                      </p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-Red w-5 h-5 border border-white rounded-full flex justify-center items-center ml-auto hover:bg-white"
                      >
                        <img src={increment} alt="Increment quantity" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startBuy(item.name)}
                      className="bg-white w-[50%] sm:w-[60%] lg:w-[70%] px-4 py-2 absolute -bottom-4 left-0 right-0 mx-auto rounded-full border border-Rose-500 flex justify-center items-center gap-2"
                    >
                      <img src={iconCart} alt="This is an icon of a cart" />
                      <p className="text-Rose-900 red-hat-600 font-bold lg:text-sm">
                        Add to Cart
                      </p>
                    </button>
                  )}
                </picture>
                <div className="p-6 mt-4">
                  <p className="text-sm text-Rose-400 red-hat-600">
                    {item.category}
                  </p>
                  <h3 className="text-lg text-Rose-900 red-hat-700 font-bold">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-Red red-hat-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Cart
            cartItems={cartItems}
            handleRemoveItem={handleRemoveItem}
            setCartItems={setCartItems}
            data={data}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
