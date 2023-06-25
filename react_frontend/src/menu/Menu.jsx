// MUI (UI components)
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

// The top-bar menu
export default function Menu({ setIsAddProdModalOpen }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "#003366",
        boxShadow: "0px 1px 4px 0px #727272",
        WebkitBoxShadow: "0px 1px 4px 0px #727272"
      }}
    >
      <Container
        maxWidth="xl"
        // root edited to remove default horizontal padding
        sx={{
          "&.MuiContainer-root": { padding: "0px" }
        }}
      >
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => setIsAddProdModalOpen(true)}
        >
          Add Product
        </Button>
      </Container>
    </Box>
  );
}
