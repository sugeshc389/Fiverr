import './Whishlist.scss';
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';

const Wishlist = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { isLoading, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
    newRequest.get(`/whishlist/${currentUser._id}`).then((res) => {
      return  res.data.whishList;
    }),
  });
  




  const removeFromWishlist = () => {};

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : data && data.length > 0 ? (
        data.map((gig) => (
          <div className="wishlist-item" key={gig._id}>
            <img src={gig.cover} alt={gig.name} />
            <div className="wishlist-item-details">
              <h3>{gig.name}</h3>
              <p>${gig.price.toFixed(2)}</p>
            </div>
            <button className="remove-button" onClick={() => removeFromWishlist()}>
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
