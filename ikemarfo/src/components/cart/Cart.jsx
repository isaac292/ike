import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for props validation
import { MdCancel } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
// import styles from "../../styles/styles"; // No need to import styles if not used
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data, quantity) => {
    dispatch(addTocart({ ...data, qty: quantity }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-opacity-50 bg-black">
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-white bg-blur">
        <div className="w-80 md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-end p-4">
            <MdCancel
              size={25}
              className="cursor-pointer text-red-500"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {cart && cart.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <h5>Cart is empty!</h5>
            </div>
          ) : (
            <>
              <div className="p-4">
                <div className="flex items-center">
                  <IoBagHandleOutline size={25} />
                  <h5 className="pl-2 text-lg font-semibold">{cart && cart.length} items</h5>
                </div>
              </div>
              <div className="border-t">
                {cart.map((item, index) => (
                  <CartSingle
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
              <div className="px-5 mb-3">
                <Link to="/checkout">
                  <div className="h-10 flex items-center justify-center w-full bg-red-500 rounded-md">
                    <h1 className="text-white text-lg font-semibold">Checkout Now (GH₵{totalPrice})</h1>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  setOpenCart: PropTypes.func.isRequired,
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [quantity, setQuantity] = useState(data.qty);
  const totalPrice = data.discountPrice * quantity;

  const increment = () => {
    if (data.stock <= quantity) {
      toast.error("Product stock limited!");
      return;
    }
    setQuantity(quantity + 1);
    quantityChangeHandler(data, quantity + 1);
  };

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
    quantityChangeHandler(data, quantity - 1);
  };

  return (
    <div className="border-b p-4">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-red-500 border border-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={increment}>
            <HiPlus size={16} className="text-white" />
          </div>
          <span>{quantity}</span>
          <div className="bg-gray-300 border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={decrement}>
            <HiOutlineMinus size={16} className="text-gray-700" />
          </div>
        </div>
        <img src={data?.images[0]?.url} alt="" className="w-20 h-auto ml-2 rounded" />
        <div className="pl-2">
          <h1 className="text-lg font-semibold">{data.name}</h1>
          <h4 className="text-red-500">{totalPrice} GH₵</h4>
        </div>
        <MdCancel className="cursor-pointer ml-auto" onClick={() => removeFromCartHandler(data)} />
      </div>
    </div>
  );
};

CartSingle.propTypes = {
  data: PropTypes.object.isRequired,
  quantityChangeHandler: PropTypes.func.isRequired,
  removeFromCartHandler: PropTypes.func.isRequired,
};

export default Cart;
