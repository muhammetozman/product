import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:3003/products");
    setProduct(result.data.reverse());
  };

  const deleteProduct = async id => {
    await axios.delete(`http://localhost:3003/products/${id}`);
    loadProducts();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Products</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Production Date</th>
              <th scope="col">Barcode No</th>
              <th scope="col">Expiration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.productdate}</td>
                <td>{product.barcode}</td>
                <td>{product.expiration}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/products/${product.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/products/edit/${product.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;