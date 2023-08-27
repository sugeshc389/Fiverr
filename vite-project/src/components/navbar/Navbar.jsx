import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useState } from "react";



const Navbar = () => {
    const [active, setActive] = useState(false);

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
        <div className={active ? "navbar active " : "navbar"}>
            <div className='container'>
                <div className="logo">
                    {/* <Link to="/"> */}
                    <span className='text'>fiverr</span>
                    {/* </Link> */}
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
                        <div className="user">
                            <img src="" alt="" />
                            <span>{currentUser?.userName}</span>
                            <div className="options">
                                {
                                    currentUser?.isSeller && (
                                        <>
                                        <span>Gigs</span>
                                        <span>Add New Gigs</span>
                                        </>
                                    )
                                }
                                <span>Orders</span>
                                <span>Messages</span>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {
                active && (
                    <>
                        <hr />
                        <div className="menu">
                            <span>Test1</span>
                            <span>Test2</span>
                        </div>
                    </>
                )
            }



        </div>
    );
};

export default Navbar