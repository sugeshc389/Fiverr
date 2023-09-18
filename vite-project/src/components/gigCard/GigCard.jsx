import { useState } from 'react';
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";





const GigCard = ({ item }) => {
  const [isColorChanged, setColorChanged] = useState(false);


  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),



  });
  const handleClick = async () => {

    const res = await newRequest.put('/whishlist', { item });
    setColorChanged(!isColorChanged);
    console.log(res);

  }




  return (

    <div className="gigCard">
      <Link to={`/gig/${item._id}`} className="link">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.userName}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
      </Link>
      <hr />
      <div className="detail">
        <div className="whishlist">
          <img
            onClick={handleClick}
            className={`image ${isColorChanged ? 'color-changed' : ''}`}
            src="./img/hert 1.png"
            alt=""
            title="Wishlist"
          />
        </div>

        <div className="price">
          <span>STARTING AT</span>
          <h2>$ {item.price}</h2>
        </div>
      </div>
    </div>


  );

};

export default GigCard;