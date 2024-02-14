import React, { useEffect } from 'react'

import "./Content.css"
import { getCategory } from '../../redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from "react-router-dom";


const Content = () => {
const items = useSelector((state) => state.item.items)
const dispatch = useDispatch();
const navigate = useNavigate();


useEffect(() => {
    dispatch(getCategory());
}, []); 



const handleProduct =(category) =>{
    navigate('/product', {state: {categoryId: category._id, categoryName: category.categoryName }})
}


  return (
    <div>
        <div className='category'>
            <h3>Category</h3>
        <div className='Category-space'>
            
        <div className='spacing'>
            {items &&items.map((category,index) =>(
            <div className='categories' key= {index}>
                <button className="Product_Btn" onClick={() => handleProduct(category)}  > 
                <div className='categoryImg-box'>
                    <img src={`http://localhost:5001/images/${category.categoryImg}`}  alt="nothing" />
                    </div></button> 
                
                <h5>{category.categoryName}</h5>
            </div>
             ))}
        </div>
       
        </div>
        <div className='product-space'>

        </div>
    </div>
    </div>
  )
}

export default Content