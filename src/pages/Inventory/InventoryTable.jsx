import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function InventoryTable() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [InventoryList, setInventoryList] = useState();

    const [editProduct, setEditProduct] = useState({ name: "", unitPrice: 0, uom: "Nos", sellingPrice: 0, minStock: 3, maxStock: 20 })

    const onInputChange = (e) => {

        console.log(editProduct)
        console.log(e.target.name + " " + e.target.value)
        setEditProduct({ ...editProduct, [e.target.name]: e.target.value })

    }
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(editProduct)

        const { name, unitPrice, uom, sellingPrice, minStock, maxStock } = editProduct
        axios.put(`http://localhost:8000/api/product/${editProduct.id}`, { name, unitPrice, uom, sellingPrice, minStock, maxStock })
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
            .delete(`http://localhost:8000/api/product/${id}`)
            .then(response => {
                console.log(response.data.message)
                toast.error(response.data.message)
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            })
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(({ data }) => { setInventoryList(data); })

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
                                    <th>S no</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>UOM</th>
                                    <th>Selling Price</th>
                                    <th>Current Stock</th>
                                    <th>Min Stock</th>
                                    <th>Max Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    InventoryList && InventoryList.map((Inventory, index) => (
                                        <tr key={Inventory.id}>
                                            <td>{index + 1}</td>
                                            <td>{Inventory.name}</td>
                                            <td>{Inventory.unitPrice}</td>
                                            <td>{Inventory.uom}</td>
                                            <td>{Inventory.sellingPrice}</td>
                                            <td>{Inventory.currentStock}</td>
                                            <td>{Inventory.minStock}</td>
                                            <td>{Inventory.maxStock}</td>
                                            <td>
                                                <Button
                                                    className="btn btn-warning btn-sm rounded mx-1"
                                                    onClick={
                                                        () => {
                                                            setEditProduct(Inventory);
                                                            handleShow();
                                                        }}
                                                >
                                                    <i className="fa fa-edit" />
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm rounded mx-1"
                                                    onClick={() => { handleDelete(Inventory.id) }}
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


            {/* EDIT Inventory MODEL */}
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
                        Edit Inventory
                    </Modal.Title>
                </Modal.Header>

                {/* MODAL BODY */}
                <Modal.Body>
                    <Container className='px-5'>
                        <Form
                            id='addInventoryForm'
                            onSubmit={handleUpdate}
                        >
                            <Form.Group className="mb-3" controlId="formInventoryName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product name"
                                    name='name'
                                    value={editProduct.name}
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
                                    value={editProduct.unitPrice}
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
                                    value={editProduct.uom}
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
                                    value={editProduct.sellingPrice}
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
                                    value={editProduct.minStock}
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
                                    value={editProduct.maxStock}
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
                        Update
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default InventoryTable