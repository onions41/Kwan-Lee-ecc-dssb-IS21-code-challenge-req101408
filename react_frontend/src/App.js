import { Container, Box } from "@mui/material";
import { useState, useEffect, useReducer } from "react";

// Components
import Menu from "./menu/Menu";
import ProductsTable from "./productsTable/ProductsTable";
import AddProductModal from "./addProductModal/AddProductModal";

export default function App() {
  const [prodFetchState, setProdFetchState] = useState({ loading: true, error: false });
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER_URL}/product`, {
      method: "GET"
    })
      .then(async (response) => {
        const resData = await response.json();
        // If the API retursns 500. there won't be an error, there. You need to catch that error.
        prodDispatch({ type: "fetchedAllProd", data: resData });
        setProdFetchState({ loading: false, error: false });
      })
      .catch((error) => {
        // Connection error
        setProdFetchState({ loading: false, error });
      });
  }, []);

  if (prodFetchState.loading) {
    return <div>Loading</div>;
  }

  if (prodFetchState.error) {
    return <div>There was some error</div>;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Menu
        setIsAddProdModalOpen={setIsAddProdModalOpen}
        productTotal={products.length}
      />
      <Container
        maxWidth="xl"
        // root edited to remove default horizontal padding
        sx={{ flexGrow: 1, "&.MuiContainer-root": { padding: "0px" } }}
      >
        <Box sx={{ width: "100%", height: "100%", padding: "20px 0 0" }}>
          <ProductsTable products={products} dispatch={prodDispatch} />
        </Box>
      </Container>
      <AddProductModal
        isOpen={isAddProdModalOpen}
        setIsOpen={setIsAddProdModalOpen}
        dispatch={prodDispatch}
      />
    </Box>
  );
}
