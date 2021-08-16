import { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";

const Activities = () => {
    const [activities, setActivities] = useState([]);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log('Activities useEffect');

        if (!authCtx.userId || !authCtx.token) return;

        fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${authCtx.token}`
        ).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setActivities(data);
        });
    }, [authCtx.userId, authCtx.token]);

    let content = <div className='mx-auto text-center'>
        <p>Welcome to Activities Page!</p>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>;

    return (
        <Container className="mt-4">
            {content}
        </Container>
    );
}

export default Activities;