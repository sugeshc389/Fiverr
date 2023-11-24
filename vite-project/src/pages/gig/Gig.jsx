import "./Gig.scss";

import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, Typography, Stack,
  Accordion, AccordionSummary, AccordionDetails, Grid, Skeleton
} from "@mui/material"
import { useState } from "react"
import { Slider } from "infinite-react-carousel/lib";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'



function Gig() {
  const { id } = useParams();
  const [open, openChange] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [gig, setGig] = useState([]);
  const nav = useNavigate();



  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        setGig(data)
        return res.data;



      }),

  });
  console.log(gig);
  const functionOpenPopup = () => {
    openChange(true);
  }
  const closePopup = () => {
    openChange(false);


  }




  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)


    }

  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)

  };

  const initPayment = (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_ID_KEY,
      amount: data.amount,
      currency: data.currency,
      name: gig.title,
      description: "Test Transaction",
      image: gig.cover,
      order_id: data.id,
      handler: async (res) => {
        try {
          const verifyUrl = `/payment/verify`;
          const { data } = await newRequest.post(verifyUrl, res)
          console.log(data);
          nav('/checkout');


        } catch (error) {
          console.log(error);

        }
      },
      theme: {
        color: "#3399cc"
      }


    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const handlePayment = async (price) => {
    try {
      const orderUrl = '/payment/orders'
      const { data } = await newRequest.post(orderUrl, { amount: price })
      console.log(data);
      localStorage.setItem("gig", JSON.stringify(gig));
      initPayment(data.data)

    } catch (error) {
      console.log(error);

    }

  }


  return (
    <div className="gig">
      {isLoading ? (
        <Stack variant='row'>
          <Skeleton variant="rectangular" width={16} height={8} animation="wave" />
          <Skeleton variant="text" animation="wave"/>
          <Skeleton variant="text" animation="wave"/>
          <Skeleton variant="text" animation="wave"/>
        </Stack>
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            {isLoading ? <Stack>
              <Skeleton variant="text" animation="wave" />
            </Stack> : <h1>{data.title}</h1>}
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.userName}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={functionOpenPopup} color="primary" variant="contained">Continue</Button>

              <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm" sx={{ height: '100vh' }} >
                <DialogTitle>Order options</DialogTitle>
                <Divider variant="middle" orientation="horizontal" />


                <DialogContent>
                  <DialogContentText>

                  </DialogContentText>

                  <Stack spacing={4} sx={{ border: '1px solid', borderRadius: '4px', padding: '16px' }}>
                    <Grid container direction="row" justifyContent="space-between">
                      <Typography gutterBottom variant="h5" component='div'>
                        Basic
                      </Typography>
                      <Typography>₹{data.price * quantity}</Typography>
                    </Grid>

                    <Grid container direction="column">
                      <Typography variant="body2" color='text.secondary'>
                        Basic Package I will do a unique logo design for your business
                      </Typography>
                    </Grid>
                    <Divider />

                    <Grid container direction="row" justifyContent="space-around">


                      <Typography>Gig Quantity </Typography>
                      <IconButton color="primary" aria-label="min" onClick={() => handleDecrement()}>
                        <RemoveCircleIcon sx={{ fontSize: 50 }} />
                      </IconButton>
                      <Typography>{quantity}</Typography>

                      <IconButton color="primary" aria-label="Add" onClick={() => handleIncrement()} >
                        <AddCircleIcon sx={{ fontSize: 50 }} />
                      </IconButton >



                    </Grid>


                  </Stack>


                  <Typography >Upgrade your order with extras</Typography>


                  <Stack alignItems='center' spacing={5} sx={{ border: '1px solid', borderRadius: '4px', padding: '16px' }}>
                    <Grid container direction="row" justifyContent="space-between">
                      <Typography >Extra-fast 1-day delivery</Typography>


                      <FormControlLabel
                        control={
                          <Checkbox

                            color="primary"
                          />
                        }

                      />
                    </Grid>
                    <Grid container direction="column">

                      <Typography>₹{data.price}</Typography>
                    </Grid>

                  </Stack>

                  <Stack alignItems='center' spacing={5} sx={{ border: '1px solid', borderRadius: '4px', padding: '16px' }}>
                    <Grid container direction="row" justifyContent="space-between">

                      <Typography >Additional revision(+1 day)</Typography>
                      <FormControlLabel
                        control={
                          <Checkbox

                            color="primary"
                          />
                        }

                      />
                    </Grid>
                    <Grid container direction="column">
                      <Typography >Add an additional revision your seller will provide after the delivery</Typography>
                      ₹873
                    </Grid>

                  </Stack>

                  <Accordion>
                    <AccordionSummary
                      id='panel1-header'
                      aria-control='panel1-content'
                      expandIcon={<ExpandMoreIcon />}>
                      <Typography>Show more extras
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatibus assumenda praesentium molestias labore doloribus! Similique animi cumque beatae,
                      quo earum delectus dolores velit eligendi tempore placeat, ad recusandae iusto distinctio!
                    </AccordionDetails>

                  </Accordion>


                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handlePayment(data.price * quantity)} color="success" variant="contained">Continue(₹{data.price * quantity})</Button>
                  <Button onClick={closePopup} color="error" variant="contained">Close</Button>
                </DialogActions>

              </Dialog>
            </div>

          </div>
        </div>
      )
      }

    </div >
  );
}

export default Gig;