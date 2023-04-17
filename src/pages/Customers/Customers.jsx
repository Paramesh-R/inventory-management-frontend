import React from 'react'
import { Button } from 'react-bootstrap'
import CustomerHeader from './CustomerHeader'
import CustomerTable from './CustomerTable'

const Customers = () => {
    return (
        <>
            <div className="container-fluid px-4 min-vh-100">
                <div className="py-4">

                    <CustomerHeader />
                    <CustomerTable />


                </div>
            </div>
            {/* <ModalAddCustomer /> */}
        </>
    )
}

export default Customers