import { Card, Col, Row } from "react-bootstrap";
import { MdDirectionsBike, MdDirectionsRun } from "react-icons/md";
import { FaDumbbell, FaMountain, FaRoad, FaSwimmer } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";
import { metresToKm, toTimeString } from "../../utils/functions";
import { BiTimer } from "react-icons/bi";

const ActivityCard = (props) => {
    let icon;
    if (props.type === "Hike") {
        icon = <FaMountain className='text-center mx-auto' size="1.6em"></FaMountain>
    } else if (props.type === "Ride") {
        icon = <MdDirectionsBike className='text-center mx-auto' size="1.6em"></MdDirectionsBike>;
    } else if (props.type === "Run") {
        icon = <MdDirectionsRun className='text-center mx-auto' size="1.6em"></MdDirectionsRun>;
    } else if (props.type === "Workout") {
        icon = <FaDumbbell className='text-center mx-auto' size="1.6em"></FaDumbbell>
    } else if (props.type === "Swim") {
        icon = <FaSwimmer className='text-center mx-auto' size="1.6em"></FaSwimmer>
    } else {
        icon = <FiActivity className='text-center mx-auto' size="1.6em"></FiActivity>;
    }

    const activityStartingDate = new Date(props.start_date);
    const month = activityStartingDate.getUTCMonth() + 1; //months from 1-12
    const day = activityStartingDate.getUTCDate();
    const year = activityStartingDate.getUTCFullYear();
    const formattedDate = day + '-' + month + '-' + year;

    return (
        <Card className='text-center mb-3 shadow-sm'>
            <p className='my-1'>
                <span className='fw-bold'>{props.name} </span>
                <span>({formattedDate})</span>
            </p>
            <div className="pb-2">
                {icon}
            </div>
            <div className="bg-light py-1">
                <Row >
                    <Col>
                        <span className='fw-bold'>
                            Distance
                        </span>
                    </Col>
                    <Col>
                        <span className='fw-bold'>
                            Moving Time
                        </span>
                    </Col>
                    <Col>
                        <span className='fw-bold'>
                            Elevation
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col><FaRoad></FaRoad></Col>
                    <Col><BiTimer size="1.5em"></BiTimer></Col>
                    <Col><FaMountain></FaMountain></Col>
                </Row>
                <Row>
                    <Col>{metresToKm(props.distance)}km</Col>
                    <Col>{toTimeString(props.moving_time)}</Col>
                    <Col>{props.total_elevation_gain}m</Col>
                </Row>
            </div>
            <Link
                className='btn btn-primary btn-sm px-3 my-2 mx-auto'
                to={`/activities/${props.id}`}>
                Open Details
            </Link>
        </Card>
    );
}

export default ActivityCard;