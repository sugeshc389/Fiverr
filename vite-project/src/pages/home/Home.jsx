import "./Home.scss"
import CatCard from '../../components/catCard/CatCard';
import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import { cards } from '../../data';



export const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map(card => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>The best part? Everything.</h1>
            <div className="title">
              <img src="/img/check.png" alt="" />
              Stick to your budget

            </div>
            <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="/img/check.png" alt="" />
              Get quality work done quickly

            </div>
            <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
            <div className="title">
              <img src="/img/check.png" alt="" />

              Pay when you're happy

            </div>
            <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>
            <div className="title">
              <img src="/img/check.png" alt="" />
              Count on 24/7 support

            </div>
            <p>Our round-the-clock support team is available to No hourly rates, just project-based pricing.</p>

          </div>
          <div className="item">
            <video src="./img/fiverr.mp4" controls></video>
          </div>
        </div>

      </div>
      <div className="features blue">
        <div className="container">
          <div className="item">


            <div className="text">
              <span className='logo'>fiverr</span>
              <span className='dot'>.</span>
              Business Solutions
            </div>
            <h2>Advanced solutions and professional
              talent for businesses</h2>
            <h4>Fiverr Pro</h4>
            <div className="title">
              <img src="/img/check.png" alt="" />
              <p>Access top freelancers and professional
                business tools for any project</p>
            </div>
            <h4>Fiverr Certified</h4>
            <div className="title">
              <img  src="/img/check.png" alt="" />
              <p>Build your own branded marketplace of
                certified experts</p>
            </div>
            <h4>Fiverr Enterprise</h4>
            <div className="title">
              <img src="/img/check.png" alt="" />
              <p>Manage your freelance workforce and onboard additional talent with an
                end-to-end SaaS solution</p>
            </div>
            <button>Learn more</button>



          </div>
          <div className="item blue">
            <div className="image-container">

              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png"
                alt=""
                style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
