import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal, Table, } from 'react-bootstrap'
import Select from 'react-select'
import { toast } from 'react-toastify';


const SalesHeader = () => {

    // ---------------------------------------- MODAL FORM to create Purchase Order (STEP: 1)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ---------------------------------------- 


    // ---------------------------------------- Prepare Supplier list and filtered Product (STEP: 2)
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        // For Buyer Dropdown - 2(a). Buyer Dropdown - GET SUPPLIER LIST (ID and VALUE)
        axios
            .get('https://inventory-management-backend-3qxr.onrender.com/api/customer')
            .then(({ data }) => { setCustomers(data.map(({ id, name }) => { return { "value": id, "label": name } })) })

        // For Product Dropdown - 2(b). Add Product Dropdown - GET PRODUCT LIST filtered
        axios
            .get('https://inventory-management-backend-3qxr.onrender.com/api/product')
            .then(({ data }) => {
                /* setProducts(data.map(({ id, name }) => {
                    console.log(data)
                    return { "value": id, "label": name }
                })) 
                console.log(products)
                */

                const filteredProductGtMinStock = data.filter(product => product.currentStock > 0);
                setProducts(filteredProductGtMinStock.map((product) => {
                    return { "value": product, "label": product.name, "id": product.id }
                }))

            })


    }, [])
    // ---------------------------------------- 


    // ----------------------------------------  STATES FOR CREATION OF PURCHASE ORDER  (STEP: 3)
    // ---------------------------------------- - Select Buyer 3(a)
    // ---------------------------------------- - Cart items 3(b) - (3 parts)
    // ---------------------------------------- - Total Purchase Price 3(c)
    const [selectedCustomer, setSelectedCustomer] = useState({ id: "", name: "" })
    const [cart, setCart] = useState([]);
    const [totalSalesPrice, setTotalSalesPrice] = useState(0);
    // ----------------------------------------


    // ----------------------------------------  TEMPORARY VALUE for Adding PRODUCT (3(b)-part2)
    const [productSelectedForAddCart, setProductSelectedForAddCart] = useState("");
    const [quantitySelectedForAddCart, setQuantitySelectedForAddCart] = useState("");
    // ---------------------------------------- 

    // ---------------------------------------- 3(b). Update Total Purchase Price when Cart updates
    useEffect(() => {
        // update products limit
    }, [cart])

    // ----------------------------------------





    /* TEST SAMPLE SCRIPT */
    /* 
    const [newBuyer, setNewBuyer] = useState({ name: "", email: "", phone: "" });
    const { name, email, phone } = newBuyer;

    const onInputChange = (e) => { setNewBuyer({ ...newBuyer, [e.target.name]: e.target.value }) } 
    */

    /* TEST SAMPLE SCRIPT END */





    // ~~~~~~~~~~~~~~~~~~~~~~~~~Test - Data for PO Creation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        console.log("********************TEST OUTPUT DATA********************")
        console.log("CUSTOMER DATA:", selectedCustomer);
        console.log("CART DATA", cart)
        console.log("TOTAL SALES PRICE", totalSalesPrice)
        console.log("TOTAL SALES PRICE", totalSalesPrice.toString())
        console.log("********************************************************")
    }, [selectedCustomer, cart, totalSalesPrice])
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~












    const handleSubmit = (e) => {           // Create Purchase Order
        e.preventDefault();
        axios
            .post('https://inventory-management-backend-3qxr.onrender.com/api/sales', {
                'customer': selectedCustomer,
                /* 
                items: [{
                    id: { type: "String" },
                    name: { type: 'String' },
                    unitPrice: { type: 'String' },
                    quantity: { type: 'Number' },
                    uom: { type: 'String' },
                    total: { type: 'String' }
                }],
                
                */
                'items': { cart },
                'salesPrice': totalSalesPrice.toString()
            })
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














    return (
        <>
            {/* Header part with Create 'Purchase Order' Button */}
            <div className="d-flex justify-content-between w-100 flex-wrap pb-5">
                <div className="mb-3 mb-lg-0">
                    <h2 className="h2">Sales Invoice</h2>
                    {/* <p className="mb-0">Details of Buyers</p> */}
                </div>
                <div>
                    <Button
                        variant='none'
                        className='bg-success p-2 text-white bg-opacity-75 outline-none'
                        onClick={handleShow}
                    >
                        <strong>Create Sales Order</strong>
                    </Button>
                </div>
            </div>


            {/* ------------- Add Buyer Model ------------- */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                // keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>                                              {/* MODAL HEADER */}
                    <Modal.Title>
                        Create Invoice
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body>                                                            {/* MODAL BODY */}
                    <Container className='px-3'>
                        <Form
                            id='addPOForm'
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3" controlId="formBuyerName">      {/* 3(a). Update Buyer.  */}
                                <Form.Label>Customer Name</Form.Label>
                                <Select
                                    options={customers}
                                    onChange={(e) => setSelectedCustomer({ id: e.value, name: e.label })}
                                    // defaultInputValue=""
                                    // value={selectedCustomer.name && selectedCustomer.name}
                                    required
                                />
                            </Form.Group>

                            <hr />                  {/* ____________________________________________________________ */}
                            <section className="py-0">                                   {/* 3(b). Update Cart and Display CART */}
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 bg-white rounded shadow-sm mb-3">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="border-0 bg-light">
                                                                <div className="p-2 px-3 text-uppercase">Product</div>
                                                            </th>
                                                            <th scope="col" className="border-0 bg-light">
                                                                <div className="py-2 text-uppercase">Price</div>
                                                            </th>
                                                            <th scope="col" className="border-0 bg-light">
                                                                <div className="py-2 text-uppercase">Qty</div>
                                                            </th>
                                                            <th scope="col" className="border-0 bg-light">
                                                                <div className="py-2 text-uppercase">Total Price</div>
                                                            </th>
                                                            <th scope="col" className="border-0 bg-light">
                                                                <div className="py-2 text-uppercase">Remove</div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {cart.map((item, index) => {

                                                            return (

                                                                <tr key={index}>
                                                                    <th scope="row" className="border-0">
                                                                        <div className="p-1">
                                                                            <div className="ms-0 d-inline-block align-middle">
                                                                                <h6 className="mb-0">
                                                                                    {/* <a href="#" className="text-dark d-inline-block align-middle">Product 1</a> */}
                                                                                    {item.label}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                    </th>
                                                                    <td className="border-0 align-middle"><strong>{item.sellingPrice}</strong></td>
                                                                    <td className="border-0 align-middle"><strong>{item.quantity}</strong></td>
                                                                    <td className="border-0 align-middle"><strong>{item.totalValue}</strong></td>
                                                                    <td className="border-0 align-middle">
                                                                        <span className="btn">
                                                                            <i className="fa fa-trash fa-lg" />
                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ------------------------------------- PRINT 3(c). TOTAL VALUE --------------------------- */}
                                    <div className="row bg-white rounded shadow-sm">
                                        {/* <div className="col-lg-6">
                                            
                                        </div> */}
                                        <div className="col-lg-12">
                                            {/* <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div> */}
                                            <div className="p-2">
                                                {/* <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p> */}
                                                <ul className="list-unstyled mb-4">
                                                    {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>$390.00</strong></li> */}
                                                    {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li> */}
                                                    {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$0.00</strong></li> */}
                                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                                        <h5 className="fw-bold">{totalSalesPrice}</h5>
                                                    </li>
                                                </ul>

                                                {/* <a href="#" className="btn btn-dark rounded-pill py-2 d-md-block">Proceed to checkout</a> */}
                                            </div>
                                        </div>
                                    </div>{/* ----------------------------------------------------------------------------------- */}

                                </div>
                            </section>
                        </Form>



                        <br />{/* ---------------------------- 3(b) - (part 1) ADD PRODUCT TO CART ----------------------------- */}
                        <h5>Add Product</h5>
                        <div className="border p-2">
                            <Form id='addProdInsidePO'>
                                <Form.Group className="mb-3" controlId="formProductName">           {/* Product Name */}
                                    <Form.Label>Product Name</Form.Label>
                                    <Select
                                        name='selectProductDropdown'
                                        options={products}
                                        defaultInputValue=""
                                        value={productSelectedForAddCart}
                                        onChange={(e) => { setProductSelectedForAddCart(e) }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formProdQuantity" >         {/* QUANTITY */}
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        min={1}
                                        max={(productSelectedForAddCart ? (productSelectedForAddCart.value.currentStock) : 1)}
                                        name='quantity'
                                        value={quantitySelectedForAddCart}
                                        onChange={
                                            (e) => {

                                                setQuantitySelectedForAddCart(e.target.value)
                                            }
                                        }
                                        required
                                    />

                                </Form.Group>

                                <div className="text-center">                                       {/* ADD BUTTON -- 3(b)-part3 --*/}
                                    <Button
                                        variant="warning"
                                        onClick={                   /* Update ADD_CART Array with product name and quantity */
                                            () => {
                                                console.log(productSelectedForAddCart);
                                                console.log(quantitySelectedForAddCart);

                                                setCart(
                                                    (cart) => [...cart, {
                                                        'id': productSelectedForAddCart.value.id,
                                                        'value': productSelectedForAddCart.value,
                                                        'label': productSelectedForAddCart.label,
                                                        'unitPrice': productSelectedForAddCart.value.unitPrice,
                                                        'sellingPrice': productSelectedForAddCart.value.sellingPrice,
                                                        'quantity': quantitySelectedForAddCart,
                                                        'totalValue': (productSelectedForAddCart.value.sellingPrice * quantitySelectedForAddCart)
                                                    }]
                                                );
                                                setTotalSalesPrice(totalSalesPrice + (productSelectedForAddCart.value.sellingPrice * quantitySelectedForAddCart))
                                                setProductSelectedForAddCart("");
                                                setQuantitySelectedForAddCart("");
                                            }
                                        }
                                        disabled={!(productSelectedForAddCart && quantitySelectedForAddCart > 0)}
                                        required
                                    >
                                        +
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        {/* ------------------------------------------------------------------------------------------- */}
                    </Container>
                </Modal.Body>


                <Modal.Footer>                                  {/* Modal FOOTER */}
                    <Button
                        variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        type='submit'
                        form='addPOForm'
                        disabled={cart.length === 0}
                    >
                        Create Invoice
                    </Button>
                </Modal.Footer>
            </Modal >{/* ------------------------------------------------------- */}


        </>
    )
}

export default SalesHeader