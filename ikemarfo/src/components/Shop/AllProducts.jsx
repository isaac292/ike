import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .then(() => {
        // Show success toast
        toast.success("Product Deleted successfully!");
        // Fetch products again to update the list
        dispatch(getAllProductsShop(seller._id));
      })
      .catch((error) => {
        // Show error toast
        toast.error("Failed to delete product");
        console.error("Failed to delete product:", error);
      });
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows =
    products?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "GH₵ " + item.discountPrice,
      Stock: item.stock,
      sold: item.sold_out,
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="w-full mx-1 pt-1 mt-10 bg-white"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {/* Toast Container */}
          <ToastContainer />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;