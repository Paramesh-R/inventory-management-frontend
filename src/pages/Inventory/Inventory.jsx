import React from 'react'
import InventoryHeader from './InventoryHeader'
import InventoryTable from './InventoryTable'

const Inventory = () => {
    return (
        <>
            <div className="container-fluid px-4 min-vh-100">
                <div className="py-4">
                    <InventoryHeader />
                    <InventoryTable />
                </div>
            </div>
        </>
    )
}

export default Inventory