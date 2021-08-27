import { Fragment, useContext, useEffect, useState } from "react";
import { Card, Col, Container, Placeholder, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";
import ActivityCard from "./ActivityCard";

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

    let content = <Fragment>
        <Col xl={4}>
            <Card className='shadow p-3'>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card>
        </Col>
        <Col xl={4}>
            <Card className='shadow p-3'>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card>
        </Col>
        <Col xl={4}>
            <Card className='shadow p-3'>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card>
        </Col>
    </Fragment>;

    if (activities !== undefined && activities.length > 0) {
        content = activities.map(activ => {
            return (
                <Col xl={4} key={activ.id}>
                    <ActivityCard {...activ}></ActivityCard>
                </Col>
            );
        })
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <p>Welcome to Activities Page!</p>
                </Col>
            </Row>
            <Row>
                {content}
            </Row>
        </Container>
    );
}

export default Activities;