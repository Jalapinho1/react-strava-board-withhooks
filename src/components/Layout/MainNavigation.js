import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const login = useLocation();

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand to='/'>Strava dashboard</Navbar.Brand>
                    <Nav className="me-auto" >
                        {!isLoggedIn &&
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        }
                        {isLoggedIn &&
                            <LinkContainer to="/profile">
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                        }
                        {isLoggedIn &&
                            <LinkContainer to="/activities">
                                <Nav.Link>Activities</Nav.Link>
                            </LinkContainer>
                        }
                    </Nav>
                    <Nav>
                        {isLoggedIn &&
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </header >
    );
};

export default MainNavigation;
