import {  Route, Routes } from 'react-router-dom';
import './App.css';


import NotFound from './pages/NotFound/NotFound'

// After Login
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard'
import Buyer from './pages/Buyer/Buyer'
import Inventory from './pages/Inventory/Inventory'
import Customers from './pages/Customers/Customers'
import Purchase from './pages/Purchase/Purchase';
import Sales from './pages/Sales/Sales';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Inventory />} />
          <Route path={"/buyer"} element={<Buyer />} />
          <Route path={"/purchase"} element={<Purchase />} />
          <Route path={"/inventory"} element={<Inventory />} />
          <Route path={"/customer"} element={<Customers />} />
          <Route path={"/sales"} element={<Sales />} />
          {/* 
           */}
          {/* 
          <Route path='/signin' element={<Login />} />
          <Route path={"/signup"} element={<Register />} />
          <Route path={"/reset"} element={<ResetPwd />} /> 
          */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
