import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout/Layout';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Login from './components/login/login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { CounterContextProvider } from './Context/CounterContext';
import { UserContextProvider } from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import Address from './components/address/address';
import AllOrders from './components/AllOrders/AllOrders';
import CashPayment from './components/CashPayment/CashPayment';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import SubCategoryDetails from './components/subCategoryDetails/subCategoryDetails';


 let query= new QueryClient();
 
let x=createBrowserRouter([
  {path:'' ,element:<Layout/>,children:[
    {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:'categories' ,element: <ProtectedRoute><Categories/></ProtectedRoute>  },
        {path:'CategoryDetails/:id' ,element: <ProtectedRoute><CategoryDetails/></ProtectedRoute>  },
        {path:'SubCategoryDetails/:id' ,element: <ProtectedRoute><SubCategoryDetails/></ProtectedRoute>  },

    {path:'brands' ,element: <ProtectedRoute> <Brands/></ProtectedRoute> },
    {path:'cart' ,element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'products' ,element:<ProtectedRoute> <Products/></ProtectedRoute>},
        {path:'productdetails/:id/:category' ,element:<ProtectedRoute> <ProductDetails/></ProtectedRoute>},
    {path:'address' ,element:<ProtectedRoute> <Address/></ProtectedRoute>},
    {path:'CashPayment' ,element:<ProtectedRoute> <CashPayment/></ProtectedRoute>},

    {path:'allorders' ,element:<ProtectedRoute> <AllOrders/></ProtectedRoute>},

        {path:'login' ,element: <Login/>},
    {path:'register' ,element: <Register/>},
        {path:'forgetPassword' ,element: <ForgetPassword/>},

        {path:'*' ,element: <Notfound/>}
  ]},

])

function App() {
  return (
    <>

    <QueryClientProvider client={query}>
    <UserContextProvider>
      <CounterContextProvider>
        <ReactQueryDevtools/>
        <CartContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster/>
        </CartContextProvider>

   </CounterContextProvider>
    </UserContextProvider>
 </QueryClientProvider>
    </>
  )
}

export default App
