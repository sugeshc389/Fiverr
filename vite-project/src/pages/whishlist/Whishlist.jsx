import { useQuery } from "@tanstack/react-query";
import './Whishlist.scss';
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser.js";

const Wishlist = () => {
  const currentUser = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myWhishlist"],
    queryFn: () =>
      newRequest.get(`/whishlist/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const removeFromWishlist = () => {};

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : data && data.length > 0 ? (
        data.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="wishlist-item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No items in the wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;
