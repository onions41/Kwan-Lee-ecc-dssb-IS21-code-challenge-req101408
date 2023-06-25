import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Pop-up dialog. Confirms before clearing form fields
export default function ComfirmClearDialog({ isOpen, setIsOpen, clearFields, resetForm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="confirm-clear-dialog"
    >
      <DialogTitle id="confirm-clear-dialog">Really clear all fields?</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            resetForm({ values: clearFields() });
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