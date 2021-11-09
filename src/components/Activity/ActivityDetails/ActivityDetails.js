import { Fragment } from "react";
import { useContext, useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import Placeholder from 'react-bootstrap/Placeholder';
import { useParams } from "react-router";
import { AuthContext } from "../../../store/auth-context";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet.fullscreen/Control.FullScreen";
import "leaflet.fullscreen/Control.FullScreen.css";

import { MdDirectionsBike, MdDirectionsRun } from "react-icons/md";
import { FaDumbbell, FaMountain, FaSwimmer } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

import classes from './ActivityDetails.module.css';
import ActivityDetailsStats from "./ActivityDetailsStats";


let polyline = require('@mapbox/polyline');

const ActivityDetails = () => {
    const params = useParams();

    const { id } = params;

    const [activityDetails, setActivityDetails] = useState();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log('Activitiy useEffect');

        if (!authCtx.token) return;

        fetch(`https://www.strava.com/api/v3/activities/${id}?access_token=${authCtx.token}`
        ).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            setActivityDetails(data);
        });
    }, [id, authCtx.token]);

    let cardContent =
        <Fragment>
            <Card.Header>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={2} />
                </Placeholder>
            </Card.Header>
            <Card.Body>
                <div>
                    <span className='fw-bold mb-1'>Loading...</span>
                </div>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={11} size='lg' />
                    <Placeholder xs={5} /> <Placeholder xs={6} />
                </Placeholder>
            </Card.Body>
        </Fragment>;

    let icon;
    let map;
    const fullscreenControl = L.control.fullscreen({
        position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
        title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
        titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
        content: null, // change the content of the button, can be HTML, default null
        forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
        forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
        fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    })

    if (activityDetails) {
        if (activityDetails.map) {
            map = <MapContainer
                className={classes.map}
                center={[activityDetails.start_latlng[0], activityDetails.start_latlng[1]]}
                zoom={13}
                whenCreated={map => {
                    fullscreenControl.addTo(map)
                }}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON key='my-geojson' data={polyline.toGeoJSON(activityDetails.map.polyline)} />
            </MapContainer>;
        }

        if (activityDetails.type === "Hike") {
            icon = <FaMountain className='text-center mx-auto' size="1.6em"></FaMountain>
        } else if (activityDetails.type === "Ride") {
            icon = <MdDirectionsBike className='text-center mx-auto' size="1.6em"></MdDirectionsBike>;
        } else if (activityDetails.type === "Run") {
            icon = <MdDirectionsRun className='text-center mx-auto' size="1.6em"></MdDirectionsRun>;
        } else if (activityDetails.type === "Workout") {
            icon = <FaDumbbell className='text-center mx-auto' size="1.6em"></FaDumbbell>
        } else if (activityDetails.type === "Swim") {
            icon = <FaSwimmer className='text-center mx-auto' size="1.6em"></FaSwimmer>
        } else {
            icon = <FiActivity className='text-center mx-auto' size="1.6em"></FiActivity>;
        }

        cardContent =
            <Fragment>
                <Card.Header className=''>
                    <span className='fw-bold'>
                        {activityDetails.name}
                    </span>
                </Card.Header>
                <Card.Body>
                    <div>{icon}</div>
                    {activityDetails.type}
                    <ActivityDetailsStats {...activityDetails}></ActivityDetailsStats>
                </Card.Body>
                <div className={classes.mapParent}>
                    {map}
                </div>
            </Fragment>;
    }

    return (
        <Container className="w-75 mb-4 ">
            <Card className='mt-4 text-center mx-auto shadow-sm'>
                {cardContent}
            </Card>
        </Container>
    );
}

export default ActivityDetails;