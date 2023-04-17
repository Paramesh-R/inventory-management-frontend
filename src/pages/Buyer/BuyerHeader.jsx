import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';


const BuyerHeader = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [newBuyer, setNewBuyer] = useState({ name: "", email: "", phone: "" });
    const { name, email, phone } = newBuyer;

    const onInputChange = (e) => {
        setNewBuyer({ ...newBuyer, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/buyer', { ...newBuyer })
            .then(response => {
                console.log(response.status) //TEST
                if (response.status === 200) {
                    toast.success(response.data.message)
                    handleClose()
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            })
            .catch(error => {
                console.log("Error");
                console.log(error.response);  //TEST
                toast.warning(error.response.status + " " + error.response.data.message) //TEST
            })

    }
    useEffect(() => {

    }, [])

    return (
        <>
            {/* begin::Content TOP Part */}
            <div className="d-flex justify-content-between w-100 flex-wrap pb-5">
                <div className="mb-3 mb-lg-0">
                    <h2 className="h2">Buyer Details</h2>
                    {/* <p className="mb-0">Details of Buyers</p> */}
                </div>
                <div>
                    <Button
                        variant='none'
                        className='bg-success p-2 text-white bg-opacity-75 outline-none'
                        onClick={handleShow}
                    >
                        <strong>Add Buyer</strong>
                    </Button>
                </div>
            </div>
            {/* end::Content TOP Part */}


            {/* Add Buyer Model */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                // keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* MODAL HEADER */}
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Buyer
                    </Modal.Title>
                </Modal.Header>

                {/* MODAL BODY */}
                <Modal.Body>
                    <Container className='px-5'>
                        <Form
                            id='addBuyerForm'
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3" controlId="formBuyerName">
                                <Form.Label>Buyer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name='name'
                                    value={name}
                                    onChange={(e) => onInputChange(e)}
                                    autoFocus
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBuyerEmail" >
                                <Form.Label>Buyer Email Id:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    name='email'
                                    value={email}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBuyerContact" >
                                <Form.Label>Buyer Contact Number:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter your contact number"
                                    name='phone'
                                    value={phone}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                    minLength={10}
                                    maxLength={10}
                                />
                            </Form.Group>

                        </Form>
                    </Container>
                </Modal.Body>

                {/* Modal FOOTER */}
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        type='submit'
                        form='addBuyerForm'
                    >
                        Add Buyer
                    </Button>
                </Modal.Footer>
            </Modal >


        </>
    )
}

export default BuyerHeader