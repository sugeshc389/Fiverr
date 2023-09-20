import './Whishlist.scss';



const Wishlist = () => {

  const removeFromWishlist = () => { };

  return (
    <div className="wishlist">
      <h2>My Wishlist</h2>

      
      <div className="wishlist-item" >
        <img src=""  />
        <div className="wishlist-item-details">
          <h3></h3>
          <p>$Price</p>
        </div>
        <button
          className="remove-button"
          onClick={() => removeFromWishlist()}
        >
          Remove
        </button>
      </div>
     
      <p>No items in the wishlist</p>
      
    </div>
  );
};

export default Wishlist;
