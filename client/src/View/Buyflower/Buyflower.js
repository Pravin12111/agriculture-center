import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Buyflower.css";

export default function Buy(){
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [flowers,setFlower] = useState({});
    const [quantity,setQuantity] = useState(1);
    const [shippingAddress,setShippingAddress] = useState('');

    const loadFlower = async()=>{

        if(!id){
            window.location.href = "/";
        }

         const response = await axios.get(`/flowers/${id}`)
     

        setFlower(response.data.data);
    };



    const increase = async()=>{
        setQuantity(quantity+1);
    }

    const decrease =async()=>{
        if(quantity>1){
            setQuantity(quantity-1);
        }
    }
    useEffect(()=>{
        loadFlower();
    },[]);


    const placeorder =async()=>{
        const response = await axios.post("/flowerorder",{
            flowers:flowers,
            user:user._id,
            quantity:quantity,
            shippingAddress:shippingAddress,
        })

        alert(response.data.message);
        window.location.href = "/orders"
    }
    return(
        <div className="flowersbuy-container">
            <img src={flowers.image} alt={flowers.name} className="flowerbuy-product-img"/>
            <div>
                <h3>Name : {flowers.name}</h3>
                <p>Description : {flowers.description}</p>
                <h4>Price : ₹ {flowers.price}</h4>

            <div className="flowerqt-container">
            <span className="flowerquantity-text">Quantity : </span>
                <span className="flowerquantity-btn" onClick={decrease}>-</span>
                <span className="flowerquantity-text">{quantity} </span>
                <span className="flowerquantity-btn" onClick={increase}>+</span>
            </div>
            <h1>Photo : </h1>
            <div className="flowerphotocontainer">
            <img src={flowers.image1} className="flowerphoto"/> 
            <img src={flowers.image2} className="flowerphoto"/> 
            <img src={flowers.image3} className="flowerphoto"/> 
            </div>
            <h1>Address : </h1>
            <input type="text"
                placeholder="shippingAddress"
                className="flowershippingAddress"
                value={shippingAddress}
                onChange={(e)=>{
                    setShippingAddress(e.target.value);
                }}
                />

                <button className="flowerBuy-btn" type="button" onClick={placeorder}>PlaceOrder</button>
            </div>
        </div>
    )
}
