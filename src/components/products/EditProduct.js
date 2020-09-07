import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
  let history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    productdate: "",
    barcode: "",
    expiration: ""
   
  });

  const { name, productdate, barcode, expiration } = product;
  const onInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/product/${id}`, product);
    history.push("/");
    
  };

  const loadProduct = async  => {
      axios.get("/api/product/"+id).then((result)=>{
    
      console.log("result : "+JSON.stringify(result.data))
      setProduct(result.data);
 
     })
     
  };
  return (
    <div className="container">
     <Link className="btn btn-primary" style={{marginTop:"10px"}} to="/">
        Back to Product Page
      </Link>
      <div className="w-75 mx-auto shadow p-5" style={{marginTop:"30px"}}>
        <h2 className="text-center mb-4">Edit A Product</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Date"
              name="productdate"
              value={productdate}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Barcode No"
              name="barcode"
              value={barcode}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Expiration Date"
              name="expiration"
              value={expiration}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <button className="btn btn-warning btn-block">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;