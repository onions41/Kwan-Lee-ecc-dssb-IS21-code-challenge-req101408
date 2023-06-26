import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Confirms before sending request to API to add new product
export default function ConfimEditProdDialog({ isOpen, setIsOpen, handleSubmit }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="confirm-edit-product-dialog"
    >
      <DialogTitle id="confirm-edit-product-dialog">Really edit product?</DialogTitle>
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
