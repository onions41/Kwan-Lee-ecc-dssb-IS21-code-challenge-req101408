import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog to indicate failure of adding a new product
export default function AddProdErrorDialog({ isOpen, setIsOpen, errorRef, setIsModalOpen }) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="add-product-error-dialog"
      aria-describedby="add-product-error-dialog-description"
    >
      <DialogTitle id="add-product-error-dialog">Error. Product was not created.</DialogTitle>
      <DialogContent>
        <DialogContentText id="add-product-error-dialog-description">
          {errorRef.current}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            errorRef.current = "";
            setIsOpen(false);
            setIsModalOpen(false);
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
