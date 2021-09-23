import { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BiSad } from "react-icons/bi";
import { AuthContext } from "../../store/auth-context";
import ProfileCard from "./ProfileCard";
import ProfileStats from "./ProfileStats";

const Profile = () => {
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userStats, setUserStats] = useState([]);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log('Profile useEffect');

        if (!authCtx.userId || !authCtx.token) return;

        fetch(`https://www.strava.com/api/v3/athletes/${authCtx.userId}/stats`,
            {
                headers: { Authorization: `Bearer ${authCtx.token}` }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            }).then(data => {
                console.log(data);
                setUserStats(data);
            }).catch(err => {
                err.json().then((body) => {
                    setError(body.message);
                });
            });
    }, [authCtx.userId, authCtx.token]);

    useEffect(() => {
        console.log('Profile useEffect');

        if (!authCtx.userId || !authCtx.token) return;

        fetch(`https://www.strava.com/api/v3/athlete`,
            {
                headers: { Authorization: `Bearer ${authCtx.token}` }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            }).then(data => {
                console.log(data);
                setUserData(data);
            }).catch(err => {
                err.json().then((body) => {
                    setError(body.message);
                });
            });
    }, [authCtx.userId, authCtx.token]);

    let content = <div className='mx-auto text-center'>
        <p>Welcome to Profile Page!</p>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>;
    if (Object.keys(userData).length !== 0 && Object.keys(userStats).length !== 0 && !error) {
        content = <div>
            <ProfileCard {...userData}></ProfileCard>
            <ProfileStats {...userStats}></ProfileStats>
        </div>
    }
    if (error) {
        content = <div className='text-center'>
            <h4>Error loading profile <BiSad></BiSad></h4>
            <p className='text-danger fw-bold'>{error}</p>
        </div>
    }
    return (
        <Container className="mt-4">
            {content}
        </Container>
    );
}

export default Profile;