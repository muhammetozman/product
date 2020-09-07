import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    productdate: "",
    barcode: "",
    expiration: ""
    
  });
  
  const { id } = useParams();
  useEffect(() => {
  loadProduct();
  }, []);
  console.log({id})
 
  const loadProduct = async () => {
   
      axios.get("/api/product/"+id).then((result)=>{
      console.log("result : "+JSON.stringify(result.data))
      setProduct(result.data);
   
     })
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Product Page
      </Link>
      <h1 className="display-4">Product Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Product Name: {product.name}</li>
        <li className="list-group-item">Product Date: {product.productdate}</li>
        <li className="list-group-item">Barcode No: {product.barcode}</li>
        <li className="list-group-item">Expiration Date: {product.expiration}</li>
      
      </ul>
    </div>
  );
};

export default Product;