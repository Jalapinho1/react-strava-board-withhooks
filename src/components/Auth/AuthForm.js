import { Button, Card, Container, Row } from "react-bootstrap";
import stravaLogo from '../../assets/stravalogo.png';
import classes from './AuthForm.module.css';

const AuthForm = () => {
    // const redirectUrl = "http://localhost:3000/redirect";
    const redirectUrl = "https://react-strava-board.herokuapp.com/redirect";
    const scope = "read,activity:read"

    const onConnectHandler = () => {
        window.location = `http://www.strava.com/oauth/authorize?client_id=63802&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
        //const stravaAuthToken = cleanUpAuthToken(location.search);
    };

    return (
        <Container className='mt-4'>
            <Row>
                <Card bg='light' className="light w-50 p-3 mx-auto">
                    <Card.Body>
                        <Card.Title className="text-center">Strava Login</Card.Title>
                        <Card.Text className="text-center mx-auto">
                            <div className="my-3">
                                <img className={classes.logo} src={stravaLogo} alt="strava-logo"></img>
                            </div>
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