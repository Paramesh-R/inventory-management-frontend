import React from 'react'
import PurchaseHeader from './PurchaseHeader'
import PurchaseTable from './PurchaseTable'

const Purchase = () => {
    return (
        <>
            <div className="container-fluid px-4 min-vh-100">
                <div className="py-4">
                    <PurchaseHeader />
                    <PurchaseTable />
                </div>
            </div>
        </>
    )
}

export default Purchase