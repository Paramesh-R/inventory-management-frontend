import React from 'react'
import { Button } from 'react-bootstrap'
import DashTable from './DashTable'

const Dashboard = () => {
  return (
    <>

      <div className="container-fluid px-4 min-vh-100">
        <div className="py-4">

          {/* begin::Content TOP Part */}
          <div className="d-flex justify-content-between w-100 flex-wrap pb-5">
            <div className="mb-3 mb-lg-0">
              <h2 className="h2">Dashboard</h2>
              {/* <p className="mb-0">Details of Buyers</p> */}
            </div>
            <div>
              {/* 
              <Button variant='none' className='bg-success p-2 text-white bg-opacity-75 outline-none'>
                <strong>Create Sales</strong>
              </Button> 
              */}

              {/* 
              <a href="https://themesberg.com/docs/volt-bootstrap-5-dashboard/components/tables/" className="btn btn-outline-gray-600 d-inline-flex align-items-center">
                <svg className="icon icon-xs me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                Bootstrap Tables Docs
              </a> 
              */}
            </div>
          </div>
          {/* end::Content TOP Part */}


          {/* <DashTable /> */}


        </div>
      </div>
    </>)
}

export default Dashboard