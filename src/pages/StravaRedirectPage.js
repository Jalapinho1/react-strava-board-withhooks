import { useContext, useEffect } from "react";
import _ from "lodash";

import {
    cleanUpAuthToken
} from "../utils/functions";
import { useHistory, useLocation } from "react-router";
import { AuthContext } from "../store/auth-context";

const StravaRedirectPage = () => {
    const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

    const history = useHistory();
    const location = useLocation();

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log('Redirect useEffect');

        const authenticate = async () => {
            try {
                // If not redirected to Strava, return to home
                if (_.isEmpty(location)) {
                    return history.push("/");
                }

                // Save the Auth Token to the Store (it's located under 'search' for some reason)
                const stravaAuthToken = cleanUpAuthToken(location.search);

                // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
                fetch(
                    `https://www.strava.com/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${stravaAuthToken}&grant_type=authorization_code`,
                    {
                        method: 'POST'
                    }
                ).then(res => {
                    return res.json();
                }).then(res => {
                    const tokens = res;
                    const accessToken = tokens.access_token;
                    const userId = tokens.athlete.id;
                    const expiresIn = +res.expires_in * 1000;
                    const expirationTime = new Date(new Date().getTime() + expiresIn);
                    authCtx.login(accessToken, userId, expirationTime.toString());

                }).catch(err => {
                    console.log('Error!');
                });

                // Once complete, go to user profile page
                history.push("/profile");
            } catch (error) {
                history.push("/");
            }
        };

        authenticate();
    }, []);

    return (
        <div>Loading...</div>
    );
}

export default StravaRedirectPage;