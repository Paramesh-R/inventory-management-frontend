import React, { useEffect, useState } from 'react'
import SelectDropdown from '../../components/SelectDropdown'
import axios from 'axios'
import Select from 'react-select'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const PurchaseTable = () => {
// MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [customerList, setCustomerList] = useState();

  const [editCustomer, setEditCustomer] = useState({ name: "", email: "", phone: "" })




  const onInputChange = (e) => {

    console.log(editCustomer)
    console.log(e.target.name + " " + e.target.value)
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value })

  }
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(editCustomer)

    const { name, email, phone } = editCustomer
    axios.put(`https://inventory-management-backend-3qxr.onrender.com/api/customer/${editCustomer.id}`, { name, email, phone })
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
      .delete(`https://inventory-management-backend-3qxr.onrender.com/api/purchase/${id}`)
      .then(response => {
        console.log(response.data.message)
        toast.error(response.data.message)
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
  }

  const [purchaseOrderList, setPurchaseOrderList] = useState([]);     // State for Purchase Orders

  useEffect(() => {                                                   // GET all Purchase Order details from Database
    axios.get('https://inventory-management-backend-3qxr.onrender.com/api/purchase')
      .then(({ data }) => { setPurchaseOrderList(data); })
    console.log(purchaseOrderList[0])
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
                  <th>PO No</th>
                  <th>Supplier</th>
                  <th>Total Purchase</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>

                {
                  purchaseOrderList && purchaseOrderList.map((po, index) => (
                    <tr key={po.id}>
                      <td>{po.poNumber}</td>
                      <td>{po.buyer.name}</td>
                      <td>{po.purchasePrice}</td>
                      {/* <td>{po.buyer.name}</td> */}
                      {/* <td>{po.purchasePrice}</td> */}

                      {/* {<td>                        <span><i className="fa fa-eye" /></span>                      </td>} */}
                    </tr>

                  ))
                }


              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  )
}

export default PurchaseTable