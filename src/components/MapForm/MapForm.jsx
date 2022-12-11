import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";

const MapForm = ({
    showForm,
    handleFormClose,
    addLocation,
    locations,
    handleFormSubmit,
    removeLocation,
}) => {
    const [location, setLocation] = useState({
        lat: "",
        lng: "",
    });

    const handleLatChange = (e) => {
        setLocation({ ...location, lat: e.target.value });
    };

    const handleLngChange = (e) => {
        setLocation({ ...location, lng: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!locations.length) {
            return;
        }

        handleFormSubmit();
        handleClose(false);
    };

    const handleClose = (e) => {
        handleFormClose(false);
        setLocation({ ...location, lat: "", lng: "" });
    };

    const handleAddLocation = (e) => {
        e.preventDefault();

        if (location.lat === "" || location.lng === "") {
            return;
        }
        addLocation(location);

        // set predfined incremented value for lat & lng
        const lat = parseFloat(location.lat) + 0.01;
        const lng = parseFloat(location.lng) + 0.01;
        setLocation({ ...location, lat, lng });
    };

    const handleDeleteLocation = (e) => {
        removeLocation(e.target.value);
    };

    return (
        <div>
            <Form noValidate validated={false}>
                <Modal
                    show={showForm}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Drone Locations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group
                                as={Col}
                                md="6"
                                controlId="formBasicLat"
                            >
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="22.7196"
                                    value={location.lat}
                                    onChange={handleLatChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                md="6"
                                controlId="formBasicLng"
                            >
                                <Form.Label>Langitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="75.8577"
                                    value={location.lng}
                                    onChange={handleLngChange}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Button
                            className="mb-3 align-right"
                            variant="primary"
                            value="addlocation"
                            onClick={handleAddLocation}
                        >
                            Add Location
                        </Button>
                        {locations.length ? (
                            <div
                                style={{
                                    maxHeight: "300px",
                                    overflowY: "overlay",
                                }}
                            >
                                <Table striped bordered hover align="center">
                                    <thead>
                                        <tr>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {locations.map((loc) => {
                                            return (
                                                <tr key={loc.lat}>
                                                    <td>{loc.lat}</td>
                                                    <td>{loc.lng}</td>
                                                    <td>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            value={loc.lat}
                                                            onClick={
                                                                handleDeleteLocation
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        ) : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Simulate Drone
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
};

export default MapForm;
