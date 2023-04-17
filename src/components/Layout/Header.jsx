import React, { useContext, useEffect } from 'react'
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import { UserContext } from '../../UserContext';
import { Link, Navigate } from 'react-router-dom';

function Header() {
    const { setUserInfo } = useContext(UserContext);
    // const { userInfo } = useContext(UserContext)


    useEffect(() => {
        console.log("Blog Header - UseEffect: Profile Validation start");
        // fetch('http://localhost:5000/users/profile', {
        //     credentials: 'include',
        // }).then(response => {
        //     if (response.status === 200) {
        //         response.json()
        //             .then(userDetails => { setUserInfo(userDetails); console.log(userDetails) })
        //             .catch(err => console.log("Header UseEffect userDetailsJSON Error" + err))
        //     } else {
        //         console.log("token Expired")
        //     }
        // })
        // console.log("Blog Header - UseEffect: Profile Validation END*");

    }, [setUserInfo])


    function logout() {
        console.log('User clicked logout')
        fetch('http://localhost:5000/users/logout', {
            credentials: "include",
            method: "POST"
        })
        setUserInfo(null)
        return <Navigate to="/" />
    }

    const username = "Paramesh"//userInfo?.username


    return (
        <>
            <Navbar key='sm' bg="dark" expand='sm' className="mb-3 navbar-dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to={"/"}>Inventory Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`} aria-labelledby={`offcanvasNavbarLabel-expand-sm`} placement="end">
                        <Offcanvas.Header closeButton><Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}></Offcanvas.Title></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {!username && (
                                    <>
                                        <Nav.Link as={Link} to={"/signin"}>Login</Nav.Link>
                                        {/* <NavDropdown align={"end"} title="Account" id={`offcanvasNavbarDropdown-expand-sm`}>
                                            <NavDropdown.Item as={Link} to={"/signin"}>Login</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to={'/register'}>Register</NavDropdown.Item>
                                        </NavDropdown> */}
                                    </>
                                )}
                                {username && (
                                    <>
                                        <Nav.Link as={Link} to={"/"}>Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to={"/buyer"}>Buyer</Nav.Link>
                                        {/* <Nav.Link as={Link} to={"/purchase"}>Purchase</Nav.Link> */}
                                        {/* <Nav.Link as={Link} to={"/inventory"}>Inventory</Nav.Link> */}
                                        <NavDropdown align={"end"} title="Inventory" id={`offcanvasNavbarDropdown-expand-sm`}>
                                            <NavDropdown.Item as={Link} to={'/inventory'}>Inventory Product Status</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            {/* <NavDropdown.Item className='text-secondary small' disabled>Signed in as: {username}</NavDropdown.Item> */}
                                            {/* <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item> */}
                                            <NavDropdown.Item as={Link} to={'/purchase'}>Purchase Items</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to={'/sales'}>Sales</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link as={Link} to={"/customer"}>Customer</Nav.Link>
                                        {/* <NavDropdown align={"end"} title="Account" id={`offcanvasNavbarDropdown-expand-sm`}>
                                            <NavDropdown.Item as={Link} to={'/mypost'}>My Account Settings</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className='text-secondary small' disabled>Signed in as: {username}</NavDropdown.Item>


                                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                        </NavDropdown> */}
                                    </>
                                )}

                            </Nav>

                            {/* Search Bar */}
                            {/* <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default Header