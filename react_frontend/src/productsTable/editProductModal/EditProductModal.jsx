import { useCallback, useState, useRef } from "react";

// Form library
import { Formik } from "formik";

// MUI (UI components)
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Internal imports
import ConfirmEditProdDialog from "./ConfirmEditProdDialog";
import EditProdErrorDialog from "./EditProdErrorDialog";

// Styles the modal
const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `3px ${theme.palette.primary.main} solid`,
  borderRadius: 10,
  width: 700,
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px 16px 38px",
  overflow: "scroll"
}));

// Styles the form and determines its layout
const FormContainer = styled(Box)({
  width: "min(700, 100%)",
  paddingLeft: 10,
  paddingRight: 10,
  display: "grid",
  columnGap: "24px",
  gridTemplateColumns: "repeat(2, 1fr)"
});

// Used to valify that the URL location of product starts with "https://github.com/bcgov/"
const locationPattern = new RegExp("https://github.com/bcgov/.+");

// Modal containing the form to edit an existing product
export default function EditProdModal({ isOpen, setModalState, product, dispatch }) {
  // Used to open or close confirmation dialog
  const [isEditProdDialOpen, setIsEditProdDialOpen] = useState(false);
  // Used to open the error dialog when submit fails
  const [isErrorDialOpen, setIsErrorDialOpen] = useState(false);
  const errorRef = useRef("");

  // Callback that runs when the form is submitted
  const onSubmit = useCallback(
    async (values) => {
      // Shapes the input value object to match the mock data
      const shapedValues = { ...values };
      const developers = [];
      for (let i = 1; i <= 5; i++) {
        if (values[`developer${i}Name`]) {
          developers.push(values[`developer${i}Name`]);
        }
        delete shapedValues[`developer${i}Name`];
      }
      shapedValues.developers = developers;

      // Makes PUT request to the API to edit a product identified URL param
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/product/${shapedValues.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(shapedValues)
      })
        .then(async (response) => {
          // Response health check
          if (!response.ok) {
            throw new Error(await response.text());
          }
          // Response is healthy
          const resObj = await response.json(); // The edited product
          // Updates the interface
          dispatch({ type: "editedProd", data: resObj });
          // Closes the modal
          setModalState({ isOpen: false, product: {} });
        })
        .catch((error) => {
          // Catches both network errors (no response) and unhealthy response errors
          errorRef.current = error.message;
          setIsErrorDialOpen(true);
        });
    },
    [dispatch, setModalState, errorRef]
  );

  return (
    <Modal
      open={isOpen}
      onClose={() => setModalState({ isOpen: false, product: {} })}
    >
      <ModalContainer>
        {/* Title of the form: "Edit product" */}
        <Typography
          variant="h5"
          component="h1"
          align="center"
          py={2.5}
        >
          Edit product
        </Typography>
        {/* Form logic starts here */}
        <Formik
          initialValues={product}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          {/* Formik child component (fields, buttons, confirmation dialogs) */}
          {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
            <FormContainer>
              {/* Product Name field*/}
              <TextField
                id="productName"
                name="productName"
                label="Product Name"
                type="text"
                autoComplete="productName"
                variant="filled"
                size="small"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                sx={{
                  // width: "calc(50% - 12px)",
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              {/* Shows ID of product being edited */}
              <Box pt={1}>
                <Typography>Product Number</Typography>
                <Typography variant="caption">{values.productId}</Typography>
              </Box>
              {/* Product Owner Name field */}
              <TextField
                id="productOwnerName"
                name="productOwnerName"
                label="Owner"
                type="text"
                size="small"
                variant="filled"
                value={values.productOwnerName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              {/* Scrum Master Name */}
              <TextField
                id="scrumMasterName"
                name="scrumMasterName"
                label="Scrum Master"
                type="text"
                size="small"
                variant="filled"
                value={values.scrumMasterName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  marginTop: 2,
                  gridColumn: "span 2"
                }}
              >
                Enter at least 1 developer
              </Typography>
              {/* Developer 1 Name */}
              <TextField
                id="developer1Name"
                name="developer1Name"
                label="Developer 1"
                type="text"
                size="small"
                variant="filled"
                value={values.developer1Name}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              {/* Developer 2 Name */}
              <TextField
                id="developer2Name"
                name="developer2Name"
                label="Developer 2"
                type="text"
                size="small"
                variant="filled"
                value={values.developer2Name}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              {/* Developer 3 Name */}
              <TextField
                id="developer3Name"
                name="developer3Name"
                label="Developer 3"
                type="text"
                size="small"
                variant="filled"
                fullWidth
                value={values.developer3Name}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              {/* Developer 4 Name */}
              <TextField
                id="developer4Name"
                name="developer4Name"
                label="Developer 4"
                type="text"
                size="small"
                variant="filled"
                value={values.developer4Name}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 1
                }}
              />
              {/* Developer 5 Name */}
              <TextField
                id="developer5Name"
                name="developer5Name"
                label="Developer 5"
                type="text"
                size="small"
                variant="filled"
                value={values.developer5Name}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  width: "calc(50% - 12px)",
                  marginTop: 1,
                  marginBottom: 1,
                  gridColumn: "span 2"
                }}
              />
              {/* Start Date */}
              <Typography
                variant="subtitle2"
                sx={{
                  marginTop: 2,
                  gridColumn: "span 2"
                }}
              >
                Start date:
              </Typography>
              <TextField
                id="startDate"
                name="startDate"
                type="text"
                size="small"
                variant="outlined"
                value={values.startDate}
                disabled={true}
                inputProps={{ type: "date" }}
                sx={{
                  marginTop: 0,
                  marginBottom: 1
                }}
              />
              {/* Methodolgy*/}
              <FormControl
                size="small"
                sx={{
                  marginTop: 0,
                  marginBottom: 1
                }}
              >
                <InputLabel id="methodology-label">Methodology</InputLabel>
                <Select
                  labelId="methodology-label"
                  id="methodology"
                  name="methodology"
                  value={values.methodology}
                  label="Methodology"
                  onChange={handleChange}
                >
                  <MenuItem value="Agile">Agile</MenuItem>
                  <MenuItem value="Waterfall">Waterfall</MenuItem>
                </Select>
              </FormControl>
              {/* Location */}
              <TextField
                id="location"
                name="location"
                label="Location"
                helperText='Must begin with "https://github.com/bcgov/"'
                type="text"
                size="small"
                variant="filled"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 5,
                  gridColumn: "span 2"
                }}
              />
              {/* Submit Button. Can only be pressed when required fields are populated */}
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                onClick={() => setIsEditProdDialOpen(true)}
                disabled={
                  isSubmitting ||
                  !values.productName ||
                  !values.productOwnerName ||
                  !values.scrumMasterName ||
                  !values.developer1Name ||
                  !values.startDate ||
                  !values.methodology ||
                  !locationPattern.exec(values.location)
                }
              >
                Submit
              </Button>
              {/* Cancel Button */}
              <Button
                variant="outlined"
                color="error"
                endIcon={<CloseIcon />}
                onClick={() => setModalState({ isOpen: false, product: {} })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              {/* Dialogs */}
              <ConfirmEditProdDialog
                isOpen={isEditProdDialOpen}
                setIsOpen={setIsEditProdDialOpen}
                handleSubmit={handleSubmit}
              />
              <EditProdErrorDialog
                isOpen={isErrorDialOpen}
                setIsOpen={setIsErrorDialOpen}
                errorRef={errorRef}
              />
            </FormContainer>
          )}
          {/* End Formik child component (end form) */}
        </Formik>
      </ModalContainer>
    </Modal>
  );
}
