import React from 'react'
import BuyerHeader from './BuyerHeader'
import BuyerTable from './BuyerTable'

const Buyer = () => {
    return (
        <>
            <div className="container-fluid px-4 min-vh-100">
                <div className="py-4">

                    <BuyerHeader />
                    <BuyerTable />


                </div>
            </div>
            {/* <ModalAddBuyer /> */}
        </>
    )
}

export default Buyer