import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function CustomerTable() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [customerList, setCustomerList] = useState();

    const [editCustomer, setEditCustomer] = useState({ name: "", email: "", phone: "" })

    const onInputChange = (e) => {

        console.log(editCustomer)
        console.log(e.target.name + " " + e.target.value)
        setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value })

    }
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(editCustomer)

        const { name, email, phone } = editCustomer
        axios.put(`https://inventory-management-backend-3qxr.onrender.com/api/customer/${editCustomer.id}`, { name, email, phone })
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
            .delete(`https://inventory-management-backend-3qxr.onrender.com/api/customer/${id}`)
            .then(response => {
                console.log(response.data.message)
                toast.error(response.data.message)
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            })
    }
    useEffect(() => {
        axios.get('https://inventory-management-backend-3qxr.onrender.com/api/customer')
            .then(({ data }) => { setCustomerList(data); })

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
                                    customerList && customerList.map((customer, index) => (
                                        <tr key={customer.id}>
                                            <td>{index + 1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>
                                                <Button
                                                    className="btn btn-warning btn-sm rounded mx-1"
                                                    onClick={
                                                        () => {
                                                            setEditCustomer(customer);
                                                            handleShow();
                                                        }}
                                                >
                                                    <i className="fa fa-edit" />
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm rounded mx-1"
                                                    onClick={() => { handleDelete(customer.id) }}
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


            {/* EDIT CUSTOMER MODEL */}
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
                        Edit Customer
                    </Modal.Title>
                </Modal.Header>

                {/* MODAL BODY */}
                <Modal.Body>
                    <Container className='px-5'>
                        <Form
                            id='addCustomerForm'
                            onSubmit={handleUpdate}
                        >
                            <Form.Group className="mb-3" controlId="formBuyerName">
                                <Form.Label>Buyer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={editCustomer.name}
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
                                    value={editCustomer.email}
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
                                    value={editCustomer.phone}
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
                        form='addCustomerForm'
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default CustomerTable