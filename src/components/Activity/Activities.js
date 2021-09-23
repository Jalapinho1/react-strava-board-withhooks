import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Card, Col, Container, Form, Placeholder, Row, Spinner, Button } from "react-bootstrap";
import { BiSad } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../../store/auth-context";
import ActivityCard from "./ActivityCard";

const Activities = () => {
    const [error, setError] = useState(false);
    const monthInputRef = useRef();
    const yearInputRef = useRef();
    const [activities, setActivities] = useState([]);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log('Activities useEffect');

        yearInputRef.current.value = new Date().getFullYear();

        const month = +monthInputRef.current.value;
        const year = +yearInputRef.current.value;
        const from = new Date(year, month === 0 ? 0 : month - 1, 1).getTime() / 1000;
        const to = new Date(year, month === 0 ? 12 : month, 0).getTime() / 1000;

        if (!authCtx.userId || !authCtx.token) return;

        fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${authCtx.token}&before=${to}&after=${from}&per_page=100`
        ).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        }).then(data => {
            console.log(data);
            setActivities(data);
        }).catch(err => {
            err.json().then((body) => {
                setError(body.message);
            });
        });

    }, [authCtx.userId, authCtx.token]);

    const searchHandler = () => {
        setActivities([]);

        const month = +monthInputRef.current.value;
        const year = +yearInputRef.current.value;
        const from = new Date(year, month === 0 ? 0 : month - 1, 1).getTime() / 1000;
        const to = new Date(year, month === 0 ? 12 : month, 0).getTime() / 1000;

        fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${authCtx.token}&before=${to}&after=${from}&per_page=100`
        ).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setActivities(data);
        });
    }

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
        });
    }

    if (error) {
        content = <div className='text-center'>
            <h4>Error loading profile <BiSad></BiSad></h4>
            <p className='text-danger fw-bold'>{error}</p>
        </div>;
    }
    return (
        <Container className="mt-4">
            <Row className='w-50 mx-auto mb-4'>
                <Col>
                    <Form.Select aria-label="Default select example" ref={monthInputRef}>
                        <option value="0">All months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" ref={yearInputRef}>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button onClick={searchHandler}>
                        <FaSearch className="me-2"></FaSearch>
                        Search
                    </Button>
                </Col>
            </Row>
            <Row>
                {content}
            </Row>
        </Container>
    );
}

export default Activities;