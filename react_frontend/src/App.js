import { useState, useEffect, useReducer } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Internal imports
import Menu from "./menu/Menu";
import ProductsTable from "./productsTable/ProductsTable";
import AddProductModal from "./addProductModal/AddProductModal";

// The landing page. Renders list of all products
export default function App() {
  // Used to indicate the result of fetching the list of all products
  const [prodFetchState, setProdFetchState] = useState({ loading: true, error: false });
  // Used to update the UI when products are fetched, added, or edited
  const [products, prodDispatch] = useReducer((products, action) => {
    switch (action.type) {
      case "fetchedAllProd":
        return action.data;
      case "addedNewProd":
        return [action.data].concat(products);
      case "editedProd":
        const index = products.findIndex((row) => row.productId === action.data.productId);
        if (index !== -1) {
          products[index] = { ...products[index], ...action.data };
        }
        return products;
      default:
        throw new Error("Invalid prodDispatch action");
    }
  }, []);
  const [isAddProdModalOpen, setIsAddProdModalOpen] = useState(false);

  // Makes the request to fetch the list of all products
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/product`, {
      method: "GET"
    })
      .then(async (response) => {
        // Response health check
        if (!response.ok) {
          throw new Error(await response.text());
        }
        // Response is healthy
        const resData = await response.json();
        // Loads fetched data into UI state
        prodDispatch({ type: "fetchedAllProd", data: resData });
        setProdFetchState({ loading: false, error: false });
      })
      .catch((error) => {
        // Catches both network errors (no response) and unhealthy response errors
        setProdFetchState({ loading: false, error: error.message });
      });
  }, []);

  // Displays while loading
  if (prodFetchState.loading) {
    return <Typography variant="h5">Loading</Typography>;
  }

  // Displays if there was an error
  if (prodFetchState.error) {
    return (
      <>
        <Typography variant="h5">There was an error when fetching the list of all products.</Typography>
        <Typography variant="h5">{prodFetchState.error}</Typography>
      </>
    );
  }

  // Displays the App
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Top bar menu */}
      <Menu
        setIsAddProdModalOpen={setIsAddProdModalOpen}
        productTotal={products.length}
      />
      <Container
        maxWidth="xl"
        // Root edited to remove default horizontal padding
        sx={{ flexGrow: 1, "&.MuiContainer-root": { padding: "0px" } }}
      >
        <Box sx={{ width: "100%", height: "100%", padding: "20px 0 0" }}>
          {/* Table displaying all products */}
          <ProductsTable
            products={products}
            dispatch={prodDispatch}
          />
        </Box>
      </Container>
      {/* Modal for adding a new product */}
      <AddProductModal
        isOpen={isAddProdModalOpen}
        setIsOpen={setIsAddProdModalOpen}
        dispatch={prodDispatch}
      />
    </Box>
  );
}
