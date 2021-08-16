import { Card } from "react-bootstrap";

const ProfileStats = (props) => {
    let { all_ride_totals, all_run_totals, biggest_climb_elevation_gain, biggest_ride_distance,
        ytd_ride_totals, ytd_run_totals } = props;

    let distance = 0;
    if (Object.keys(props).length !== 0) {
        distance = all_ride_totals.distance;
    }

    return (
        <div className="mx-auto text-center">
            <Card>
                <p>Content</p>
                {distance}
            </Card>
        </div>
    );

}

export default ProfileStats;