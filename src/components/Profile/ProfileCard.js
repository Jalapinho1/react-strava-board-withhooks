import { Card, Col, Image, Row } from "react-bootstrap";

import profileTitlePic from '../../assets/profile-background2.jpg';
import classes from './ProfileCard.module.css';

const ProfileCard = (props) => {
    let { firstname, lastname, profile, city,
        country, sex, weight } = props;

    return (
        <Card className='shadow-sm'>
            <Card.Header className={`p-0 ${classes.profile_header}`}>
                <div>
                    <Image className={classes.img_title} src={profileTitlePic}></Image>
                </div>
                <div>
                    <Image className={classes.img_profile} src={profile} roundedCircle />
                </div>
            </Card.Header>
            <Card.Body>
                <div className='mt-5 pt-3'>
                    <h4>{firstname} {lastname}</h4>
                </div>
                <Row>
                    <Col>
                        {city}, {country} ({sex})
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {weight} kg
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

}

export default ProfileCard;