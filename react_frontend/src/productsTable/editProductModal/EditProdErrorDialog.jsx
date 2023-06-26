import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Indicates failure to edit the product
export default function EditProdErrorDialog({ isOpen, setIsOpen, errorRef }) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="edit-product-error-dialog"
      aria-describedby="edit-product-error-dialog-description"
    >
      <DialogTitle id="edit-product-error-dialog">Error. Product was not edited.</DialogTitle>
      <DialogContent>
        <DialogContentText id="edit-product-error-dialog-description">
          {errorRef.current}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            errorRef.current = "";
            setIsOpen(false);
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
