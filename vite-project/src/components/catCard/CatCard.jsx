import { Link } from "react-router-dom"
import "./CatCard.scss"


const CatCard = ({ item }) => {

  console.log();
  return (
    <Link to={`/gigs?cat=${item.title}`}>

      <div className="catcard">
        <img src={item.img} alt="" />
        <span className="title">{item.title}</span>
        <span className="desc">{item.desc}</span>

      </div>


    </Link>
  )
}

export default CatCard
