import { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [cat,setCat] = useState('')
  const minRef = useRef();
  const maxRef = useRef();
  
  const user_id = localStorage.getItem("currentUser");
  const userObject = JSON.parse(user_id);
  const userId = userObject._id;

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => res.data)
        .catch((error) => {
          console.error("Error fetching data:", error);
          throw error;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const applyFilters = () => {
    refetch();
  };
  useEffect(()=>{
    setCat(data[0].cat);

  })
  console.log(cat);
 
  

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Fiverr </span>
        <h1>{cat || "Your Gig Title"}</h1>

        <p>Explore the boundaries of art and technology with Fiverr's... {cat }</p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={applyFilters}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("createdAt")}>Newest</span>
                <span onClick={() => reSort("sales")}>Best Selling</span>
                <span onClick={() => reSort("popularity")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong!</p>
          ) : (
            data.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
