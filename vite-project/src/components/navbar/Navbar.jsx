import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";



const Navbar = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const { pathname } = useLocation()


    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)


    }

    useEffect(() => {
        window.addEventListener("scroll", isActive)

    }, [])

    const currentUser = {
        id: 1,
        userName: "Sugesh Chandra",
        isSeller: true



    }
    return (
        <div className={active || pathname !== '/' ? "navbar active " : "navbar"}>
            <div className='container'>
                <div className="logo">
                    <Link className="link" to="/">
                        <span className='text'>fiverr</span>
                    </Link>
                    <span className='dot'>.</span>
                </div>

                <div className="links">
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>Sign in</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {!currentUser && <button>Join</button>}
                    {currentUser && (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src="https://avatars.githubusercontent.com/u/91643649?v=4" alt="" />
                            <span>{currentUser?.userName}</span>
                            {open && <div className="options">
                                {
                                    currentUser?.isSeller && (
                                        <>
                                            <Link className="link" to="/gigs"><span>Gigs</span></Link>
                                            <Link className="link" to="/add"><span>Add New Gigs</span></Link>
                                        </>
                                    )
                                }
                                <Link className="link" to="/orders"><span>Orders</span></Link>
                                <Link className="link" to="/messages"><span>Messages</span></Link>
                                <span>Logout</span>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
            {
                (active || pathname !== '/') && (
                    <>
                        <hr />
                        <div className="menu">
                            <Link className="link menuLink" to="/">
                                Graphi & Design
                            </Link>
                            <Link className="link" to="/">
                                Video & Animation
                            </Link>
                            <Link className="link" to="/">
                                Writing & Translation
                            </Link>
                            <Link className="link" to="/">
                                AI Services
                            </Link>
                            <Link className="link" to="/">
                                Digital Marketing
                            </Link>
                            <Link className="link" to="/">
                                Music & Audio
                            </Link>
                            <Link className="link" to="/">
                                Progrmming & Tech
                            </Link>
                            <Link className="link" to="/">
                                Business
                            </Link>
                            <Link className="link" to="/">
                                Lifestyle
                            </Link>
                        </div>
                    </>
                )
            }



        </div>
    );
};

export default Navbar