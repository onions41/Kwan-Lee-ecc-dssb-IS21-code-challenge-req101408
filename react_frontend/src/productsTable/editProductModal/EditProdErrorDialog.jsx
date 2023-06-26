import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Confirms before clearing form fields
export default function EditProdErrorDialog({ isOpen, setIsOpen, errorType, errorMsg, setIsModalOpen }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="edit-product-error-dialog"
      aria-describedby="edit-product-error-dialog-description"
    >
      <DialogTitle id="edit-product-error-dialog">{errorType}</DialogTitle>
      <DialogContent>
        <DialogContentText id="edit-product-error-dialog-description">
          {"The product was not edited. Error message: " + errorMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
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
