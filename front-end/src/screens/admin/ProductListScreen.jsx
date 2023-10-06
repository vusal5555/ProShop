import React, { useEffect } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLaoding: productLoading, error: productError }] =
    useCreateProductMutation();
  const [deleteProduct, { isLaoding: deleteLoading }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const deleteHandler = async (id) => {
    // products.filter((product) => product._id !== id);
    try {
      await deleteProduct(id);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={() => createProductHandler()}>
            <FaEdit></FaEdit> Create Product
          </Button>
        </Col>
      </Row>

      {productLoading && <Loader></Loader>}
      {deleteLoading && <Loader></Loader>}

      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CAREGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit></FaEdit>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: "white" }}></FaTrash>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
