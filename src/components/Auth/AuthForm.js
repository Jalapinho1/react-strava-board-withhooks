import { Fragment, useContext } from "react";
import { Button, ButtonGroup, Card, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";

const AuthForm = () => {
    const { REACT_APP_CLIENT_ID } = process.env;
    const redirectUrl = "http://localhost:3000/redirect";
    const scope = "read,activity:read"

    const authCtx = useContext(AuthContext);

    const onConnectHandler = () => {
        window.location = `http://www.strava.com/oauth/authorize?client_id=63802&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
        //const stravaAuthToken = cleanUpAuthToken(location.search);
    };

    return (
        <Container className='mt-4'>
            <Row>
                <Card bg='light' className="light w-50 p-3 mx-auto">
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Strava Login</Card.Title>
                        <Card.Text className="text-center mx-auto">
                            {/* <Form onSubmit={formSubmitHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form> */}
                            <Button
                                variant="primary"
                                size="md"
                                onClick={onConnectHandler}>
                                Connect with Strava
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

export default AuthForm;