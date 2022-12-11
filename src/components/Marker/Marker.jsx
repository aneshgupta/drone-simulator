import React from "react";
import { Image } from "react-bootstrap";
import droneGif from "../../assets/drone_animated.gif";
import droneStill from "../../assets/drone_still.png";

const Marker = ({ isPlay }) => {
    return (
        <div>
            <Image
                src={isPlay ? droneGif : droneStill}
                width={150}
                height={300}
                fluid
            />
        </div>
    );
};

export default Marker;
