import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import './Profile.scss'
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";

const Profile = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { isLoading, error, data } = useQuery({
        queryKey: [],
        queryFn: () =>
            newRequest.get(`/users/profile/${currentUser._id}`).then((res) => {
                return res.data;
            }),
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    })


    // if (isLoading) {
    //     return <Stack
    //         variant='row'>
    //         <Skeleton variant="rectangular" width={450} height={450} />
    //         <Skeleton variant="rectangular" width={450} height={450} />
    //     </Stack>
    // }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    if (!data || !data.createdAt) {
        return <div>Data is missing or in the wrong format.</div>;
    }

    const dateString = data.createdAt;
    const date = new Date(dateString);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return (
        <div>
            <div className="parent">
                <div className="div1">
                    <div className="proPic">
                        {isLoading ? <Stack>
                            <Skeleton variant="circular" width={80} height={80} />
                        </Stack> :
                            <img className="proImg" src={data?.img || "/img/noavatar.jpg"} alt="" />}
                        <div className='btn-div'>
                            <button className='btn'>.Online</button>
                        </div>
                    </div>
                    <div className="disName">
                        {isLoading ?
                            <Stack>
                                <Skeleton variant="text" />
                            </Stack> :
                            <a href="">{data.userName}</a>}
                        <img src="/img/edit.svg" alt="" />
                        <button>NEW</button>
                    </div>
                    <h4>@{data.userName}</h4>
                    <div>
                        <img src="/img/edit.svg" alt="" />
                    </div>
                    <button className='prevFivProBtn'>Preview Fiverr Profile</button>
                    <div className='line'></div>

                    <div className='foot'>
                        <div className='loction'>
                            <img src="/img/loction.svg" alt="" />
                            <h5>From </h5><span>{data.country}</span>
                        </div>
                        <div className='memberSince'>
                            <img src="/img/member.svg" alt="" />
                            <h5>Member since</h5><span>{month}-{year}</span>
                        </div>
                    </div>
                </div>
                <div className="div2">
                    <div className='head'>
                        <h1>learn<span>.</span> </h1>
                        <h6>FROM FIVERR</h6>
                    </div>
                    <div className='imgDiv'>
                        <img src="/img/lern.svg" alt="" />
                        <h2>Earn badges and stand out</h2>
                        <p>Boost your sales, by boosting your</p>
                        <p>expertise.</p>
                    </div>
                    <button className='scondDivBtn'>Enroll Now</button>
                </div>
                <div className="div3"> profile</div>
                <div className="div4">here </div>
                <div className="div5">
                    <div className="item">
                        <img src="/img/download.svg" alt="" />
                        <p>Ready to earn on your own terms?</p>
                        <button>Become a seller</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
