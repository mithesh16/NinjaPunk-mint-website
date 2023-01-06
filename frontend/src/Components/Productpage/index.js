import React from 'react'
import "./product.css"
import product_card from "./product_data";
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll} from 'react-scroll';

const ethers = require("ethers")

const Product = ({isconnected,contract,owner}) => {
  const togglehome=()=>{
    scroll.scrollToTop();
}

  const mint=async(id)=>{
    try{
    if(isconnected===true){
    const ninja=product_card[id-1] 
   let cost=ninja.price;
    const tx=await contract.mint(
      ninja.url,
      {value:ethers.utils.parseEther(cost.toString())})
      if(tx){
      toast.success('Minted', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });}
  }
    else{
     toast.warn("Not connected", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
  }
  catch(err){
    toast.warn(err.code, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      fontsize:13,
      });
  }

  }

  const listItems = product_card.map((item) =>
  
  
  <div className="card" key={item.id}> 
        <div className='profiles'>
          <div className='profile'>
            <img src={item.thumb} className="prod-img" alt="profilepic"/>
            <h3 className='name'>{item.name}</h3>
            <br/>
            <h5>{item.type} {item.rating}</h5>
            <h5>{item.price} ETH</h5>
            <div className='btnwrap'>
            <button className='mintbtn' value={item.id} onClick={()=>mint(item.id)}>Mint</button> 
            </div>
</div>
</div>
<ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark" />
<ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

</div>


);
  return (
    <div className='products'>
         <div className='container'>
      {listItems}
    </div>
    <button className="toTop" onClick={togglehome}>^</button>
    </div>
 

  )
}

export default Product