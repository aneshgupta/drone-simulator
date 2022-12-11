import React from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import Map from "../components/Map/Map";
import logo from "../assets/drone_logo.png";

const HomeScreen = () => {
    return (
        <div className="ui">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            src={logo}
                            width="50"
                            height="50"
                            alt="React Bootstrap logo"
                            fluid
                        />{" "}
                        Drone Simulator
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Map />
        </div>
    );
};

export default HomeScreen;
