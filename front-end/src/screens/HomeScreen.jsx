import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <h1>Latest products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
  // console.log(products);
  // return (
  //   <>
  //     <h1>Latest products</h1>
  //     <Row>
  //       {products.map((product) => {
  //         return (
  //           <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
  //             <Product product={product}></Product>
  //           </Col>
  //         );
  //       })}
  //     </Row>
  //   </>
  // );
};

export default HomeScreen;
