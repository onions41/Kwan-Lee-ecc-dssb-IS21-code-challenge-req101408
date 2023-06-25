// MUI (UI components)
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

// The top-bar menu
export default function Menu({ setIsAddProdModalOpen }) {
  return (
    <Box sx={{ width: "100%", height: "70px", backgroundColor: "plum" }}>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() => setIsAddProdModalOpen(true)}
      >
        Add Product
      </Button>
    </Box>
  );
}
