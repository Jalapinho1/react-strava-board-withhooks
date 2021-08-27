import { Fragment } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { toTimeString, metresToKm, convertToKMH } from '../../../utils/functions';
import { FaRoad, FaMountain } from "react-icons/fa";
import { BiTimer } from 'react-icons/bi';

const ActivityDetailsStats = (props) => {
    return (
        <Fragment>
            <div className="bg-light my-3 py-2">
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
            <Row>
                <Col xs={12}>
                    <Row>
                        <Table responsive="sm">
                            <thead>
                                <tr className="text-start">
                                    <td></td>
                                    <td className='fw-bold'>Avg</td>
                                    <td className='fw-bold'>Max</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-start">
                                    <td>
                                        Speed:
                                    </td>
                                    <td>
                                        {convertToKMH(props.average_speed)} km/h
                                    </td>
                                    <td>
                                        {convertToKMH(props.max_speed)} km/h
                                    </td>
                                </tr>
                                <tr className="text-start">
                                    <td>
                                        Heart Rate:
                                    </td>
                                    <td>
                                        {props.average_heartrate} bpm
                                    </td>
                                    <td>
                                        {props.max_heartrate} bpm
                                    </td>
                                </tr>
                                <tr className="text-start">
                                    <td>
                                        Calories:
                                    </td>
                                    <td>
                                        {props.calories} kcal
                                    </td>
                                </tr>
                                <tr className="text-start">
                                    <td>
                                        Elapsed time:
                                    </td>
                                    <td>
                                        {toTimeString(props.elapsed_time)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Col>

            </Row>
            <hr></hr>
            <Row>
                <Col xs={6} className='text-start'>
                    <span>
                        {props.device_name}
                    </span>
                </Col>
                {props.gear ?
                    <Col xs={4} className='text-start'>
                        <span>
                            Gear: {props.gear.name}
                        </span>
                    </Col>
                    : null}
            </Row>
        </Fragment>
    );
}

export default ActivityDetailsStats;