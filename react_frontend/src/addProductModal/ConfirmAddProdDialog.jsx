import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Confirms before sending request to API to add new product
export default function ConfimAddProdDialog({ isOpen, setIsOpen, handleSubmit }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="confirm-add-product-dialog"
    >
      <DialogTitle id="confirm-add-product-dialog">Really add product?</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleSubmit();
            setIsOpen(false);
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
