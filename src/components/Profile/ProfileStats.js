import { Card, Col, Row } from "react-bootstrap";

import runPic from '../../assets/stats_run.jpg';
import runPic2 from '../../assets/stats_run2.jpg';
import bikePic from '../../assets/stats_bike1.jpg';
import bikePic2 from '../../assets/stats_bike6.jpg';
import bikePic3 from '../../assets/stats_bike5.jpg';

const ProfileStats = (props) => {
    let { all_ride_totals, all_run_totals, biggest_climb_elevation_gain, biggest_ride_distance,
        ytd_ride_totals, ytd_run_totals } = props;

    let distance = 0;
    if (Object.keys(props).length !== 0) {
        distance = all_ride_totals.distance;
    }

    return (
        <Card className="mx-auto text-center shadow-sm my-3 px-3">
            <Row className='my-3'>
                <Col>
                    <h2>Sports Statistics</h2>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Card className="mb-3">
                        <Card.Img variant="top" src={bikePic2} />
                        <Card.Body className='text-start'>
                            <Card.Title className='text-center'>Current year cycling</Card.Title>
                            <Row>
                                <Col>Number of rides:</Col>
                                <Col>{ytd_ride_totals.count}</Col>
                            </Row>
                            <Row>
                                <Col>Total distance: </Col>
                                <Col>{Math.floor(ytd_ride_totals.distance / 1000)} km</Col>
                            </Row>
                            <Row>
                                <Col>Total elevation gain:</Col>
                                <Col>{Math.floor(ytd_ride_totals.elevation_gain)} m</Col>
                            </Row>
                            <Row>
                                <Col>Total time: </Col>
                                <Col>{Math.floor(ytd_ride_totals.elapsed_time / 3600)} hours</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="mb-3">
                        <Card.Img variant="top" src={bikePic} />
                        <Card.Body className='text-start'>
                            <Card.Title className='text-center'>All time cycling</Card.Title>
                            <Row>
                                <Col>Number of rides:</Col>
                                <Col>{all_ride_totals.count}</Col>
                            </Row>
                            <Row>
                                <Col>Total distance: </Col>
                                <Col>{Math.floor(all_ride_totals.distance / 1000)} km</Col>
                            </Row>
                            <Row>
                                <Col>Total elevation gain:</Col>
                                <Col>{Math.floor(all_ride_totals.elevation_gain)} m</Col>
                            </Row>
                            <Row>
                                <Col>Total time: </Col>
                                <Col>{Math.floor(all_ride_totals.elapsed_time / 3600)} hours</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="mb-2">
                        <Card.Img variant="top" src={bikePic3} />
                        <Card.Body className='text-start'>
                            <Card.Title className='text-center'>Cycling all time best</Card.Title>
                            <Row>
                                <Col>Biggest climb elevation:</Col>
                                <Col>{biggest_climb_elevation_gain} m</Col>
                            </Row>
                            <Row>
                                <Col> Biggest ride distance: </Col>
                                <Col>{Math.floor(biggest_ride_distance / 1000)} km</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="mb-2">
                        <Card.Img variant="top" src={runPic2} />
                        <Card.Body className='text-start'>
                            <Card.Title className='text-center'>Current year running</Card.Title>
                            <Row>
                                <Col>Number of runs:</Col>
                                <Col>{ytd_run_totals.count}</Col>
                            </Row>
                            <Row>
                                <Col>Total distance: </Col>
                                <Col>{Math.floor(ytd_run_totals.distance / 1000)} km</Col>
                            </Row>
                            <Row>
                                <Col>Total time: </Col>
                                <Col>{Math.floor(ytd_run_totals.elapsed_time / 3600)} hours</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="mb-2">
                        <Card.Img variant="top" src={runPic} />
                        <Card.Body className='text-start'>
                            <Card.Title className='text-center'>All time running</Card.Title>
                            <Row>
                                <Col>Number of runs:</Col>
                                <Col>{all_run_totals.count}</Col>
                            </Row>
                            <Row>
                                <Col>Total distance: </Col>
                                <Col>{Math.floor(all_run_totals.distance / 1000)} km</Col>
                            </Row>
                            <Row>
                                <Col>Total time: </Col>
                                <Col>{Math.floor(all_run_totals.elapsed_time / 3600)} hours</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Card>
    );

}

export default ProfileStats;