import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function BuyerTable() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [BuyerList, setBuyerList] = useState();

    const [editBuyer, setEditBuyer] = useState({ name: "", email: "", phone: "" })

    const onInputChange = (e) => {

        console.log(editBuyer)
        console.log(e.target.name + " " + e.target.value)
        setEditBuyer({ ...editBuyer, [e.target.name]: e.target.value })

    }
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(editBuyer)

        const { name, email, phone } = editBuyer
        axios.put(`http://localhost:8000/api/buyer/${editBuyer.id}`, { name, email, phone })
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    handleClose()
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            })
            .catch(error => {
                console.log(error)
                toast.warning(error.response.status + " " + error.response.data.message) //TEST
            })
    }

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/api/buyer/${id}`)
            .then(response => {
                console.log(response.data.message)
                toast.error(response.data.message)
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            })
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/buyer')
            .then(({ data }) => { setBuyerList(data); })

    }, [])
    useEffect(() => {


    }, [])

    return (
        <>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">

                        {/* TABLE */}
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    BuyerList && BuyerList.map((Buyer,index) => (
                                        <tr key={Buyer.id}>
                                            <td>{index+1}</td>
                                            <td>{Buyer.name}</td>
                                            <td>{Buyer.email}</td>
                                            <td>{Buyer.phone}</td>
                                            <td>
                                                <Button
                                                    className="btn btn-warning btn-sm rounded mx-1"
                                                    onClick={
                                                        () => {
                                                            setEditBuyer(Buyer);
                                                            handleShow();
                                                        }}
                                                >
                                                    <i className="fa fa-edit" />
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm rounded mx-1"
                                                    onClick={() => { handleDelete(Buyer.id) }}
                                                >
                                                    <i className="fa fa-trash" />
                                                </Button>
                                            </td>
                                        </tr>

                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* EDIT Buyer MODEL */}
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
                        Edit Buyer
                    </Modal.Title>
                </Modal.Header>

                {/* MODAL BODY */}
                <Modal.Body>
                    <Container className='px-5'>
                        <Form
                            id='addBuyerForm'
                            onSubmit={handleUpdate}
                        >
                            <Form.Group className="mb-3" controlId="formBuyerName">
                                <Form.Label>Buyer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={editBuyer.name}
                                    onChange={(e) => onInputChange(e)}
                                    autoFocus
                                // required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBuyerEmail" >
                                <Form.Label>Buyer Email Id:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    name="email"
                                    value={editBuyer.email}
                                    onChange={(e) => onInputChange(e)}
                                // required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBuyerContact" >
                                <Form.Label>Buyer Contact Number:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter your contact number"
                                    name="phone"
                                    value={editBuyer.phone}
                                    onChange={(e) => onInputChange(e)}
                                // required
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
                        Update
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default BuyerTable