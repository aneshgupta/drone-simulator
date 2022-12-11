import React from "react";
import { Button } from "react-bootstrap";

const Simulate = ({ isPlay, handlePlayPause, handleFormClose, showForm }) => {
    const handleOnClickSimulate = (e) => {
        const btnValue = e.target.value;

        if (btnValue === "resume") {
            handlePlayPause(true);
        } else if (btnValue === "pause") {
            handlePlayPause(false);
        }
    };

    const handleOnClickLocation = (e) => {
        e.preventDefault();

        handleFormClose(true);
    };

    return (
        <div>
            <Button
                style={{ position: "absolute", top: "10px", right: "50%" }}
                variant={isPlay ? "danger" : "success"}
                onClick={handleOnClickSimulate}
                value={isPlay ? "pause" : "resume"}
                hidden={showForm}
            >
                {isPlay ? "Pause" : "Resume"}
            </Button>
            <Button
                style={{ position: "absolute", top: "10px", right: "10px" }}
                variant="primary"
                onClick={handleOnClickLocation}
                value="newlocation"
                hidden={showForm}
            >
                New Drone Location
            </Button>
        </div>
    );
};

export default Simulate;
