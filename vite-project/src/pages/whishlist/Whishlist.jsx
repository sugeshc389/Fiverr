// import { useState } from 'react';
import './Whishlist.scss';
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser.js";



const Wishlist = () => {
  const currentUser = getCurrentUser();
  
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["myWhishlist"],
    queryFn: () =>
      newRequest.get(`/whishlist?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  // const removeFromWishlist = (itemId) => {

  // };

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      {data.map((item) => (
        <div className="wishlist-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="wishlist-item-details">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <button
            className="remove-button"
            // onClick={() => removeFromWishlist(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
