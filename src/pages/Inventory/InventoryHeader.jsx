import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, } from 'react-bootstrap'
import {  toast } from 'react-toastify';


const InventoryHeader = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [newProduct, setNewProduct] = useState({ name: "", unitPrice: 0, uom: "Nos", sellingPrice: 0, minStock: 3, maxStock: 20 });
    const { name, unitPrice, uom, sellingPrice, minStock, maxStock } = newProduct;

    const onInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/product', { ...newProduct })
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
                    <h2 className="h2">Inventory Details</h2>
                    {/* <p className="mb-0">Details of Inventorys</p> */}
                </div>
                <div>
                    <Button
                        variant='none'
                        className='bg-success p-2 text-white bg-opacity-75 outline-none m-2'
                        onClick={handleShow}
                    >
                        <strong>Add Product</strong>
                    </Button>
                    <Button
                        variant='none'
                        className='bg-success p-2 text-white bg-opacity-75 outline-none m-2'
                        onClick={handleShow}
                    >
                        <strong>Create Purchase Order</strong>
                    </Button>
                    <Button
                        variant='none'
                        className='bg-success p-2 text-white bg-opacity-75 outline-none m-2'
                        onClick={handleShow}
                    >
                        <strong>Create Sales</strong>
                    </Button>
                </div>
            </div>
            {/* end::Content TOP Part */}


            {/* Add Inventory Model */}
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
                        Add Product
                    </Modal.Title>
                </Modal.Header>

                {/* MODAL BODY */}
                <Modal.Body>
                    <Container className='px-5'>
                        <Form
                            id='addInventoryForm'
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3" controlId="formInventoryName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product name"
                                    name='name'
                                    value={name}
                                    onChange={(e) => onInputChange(e)}
                                    autoFocus
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formInventoryEmail" >
                                <Form.Label>Purchase Price (Per Unit)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Amount"
                                    name='unitPrice'
                                    value={unitPrice}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInventoryEmail" >
                                <Form.Label>Unit of Measurement</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nos"
                                    name='uom'
                                    value={uom}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInventoryEmail" >
                                <Form.Label>Selling Price (Per Unit)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Amount"
                                    name='sellingPrice'
                                    value={sellingPrice}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                />
                            </Form.Group>

                            {/* MINIMUM STOCK */}
                            <Form.Group className="mb-3" controlId="formInventoryEmail" >
                                <Form.Label>Min Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="3"
                                    name='minStock'
                                    value={minStock}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                />
                            </Form.Group>

                            {/* MAXIMUM STOCK */}
                            <Form.Group className="mb-3" controlId="formInventoryEmail" >
                                <Form.Label>Max Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Amount"
                                    name='maxStock'
                                    value={maxStock}
                                    onChange={(e) => onInputChange(e)}
                                    required
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
                        form='addInventoryForm'
                    >
                        Add Inventory
                    </Button>
                </Modal.Footer>
            </Modal >


        </>
    )
}

export default InventoryHeader