import React from 'react'
import SalesHeader from './SalesHeader'
import SalesTable from './SalesTable'

function Sales() {
    return (
        <>
            <div className="container-fluid px-4 min-vh-100">
                <div className="py-4">
                    <SalesHeader />
                    <SalesTable />
                </div>
            </div>
        </>
    )
}

export default Sales