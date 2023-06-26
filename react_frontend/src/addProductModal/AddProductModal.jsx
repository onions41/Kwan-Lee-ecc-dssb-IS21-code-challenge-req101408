import { useCallback, useState, useRef } from "react";

// Form library
import { Formik } from "formik";

// MUI (UI components)
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Internal imports
import { getFieldValues, clearFieldValues, saveFieldValues } from "./fieldValues";
import ConfirmAddProdDialog from "./ConfirmAddProdDialog";
import ConfirmClearDialog from "./ConfirmClearDialog";
import AddProdErrorDialog from "./AddProdErrorDialog";

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

// Modal containing the form to add a new product
export default function AddProductModal({ isOpen, setIsOpen, dispatch }) {
  // Used to open or close submit and clear confirmation dialogs
  const [isAddProdDialOpen, setIsAddProdDialOpen] = useState(false);
  const [isClearDialOpen, setIsClearDialOpen] = useState(false);
  // Used to open the error dialog when submit fails
  const [isErrorDialOpen, setIsErrorDialOpen] = useState(false);
  const errorRef = useRef("");

  // Callback that runs when the form is submitted
  const onSubmit = useCallback(
    async (values, { resetForm }) => {
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

      // Makes POST request to the API to add a new product
      fetch(`${process.env.REACT_APP_API_SERVER_URL}/product`, {
        method: "POST",
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
          const resObj = await response.json();
          // Update the interface
          dispatch({ type: "addedNewProd", data: resObj });
          // Reset the form
          resetForm({ values: clearFieldValues() });
          // Close the modal
          setIsOpen(false);
        })
        .catch((error) => {
          // Catches both network errors (no response) and unhealthy response errors
          errorRef.current = error.message;
          setIsErrorDialOpen(true);
        });
    },
    [dispatch, setIsOpen, errorRef]
  );

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalContainer>
        {/* Title of the form: "Add a new product" */}
        <Typography
          variant="h5"
          component="h1"
          align="center"
          py={2.5}
        >
          Add a new product
        </Typography>
        {/* Form logic starts here */}
        <Formik
          initialValues={getFieldValues()}
          // validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          {/* Formik child component (fields, buttons, confirmation dialogs) */}
          {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, resetForm }) => (
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                autoFocus
                sx={{
                  width: "calc(50% - 12px)",
                  marginTop: 1,
                  marginBottom: 1,
                  gridColumn: "span 2"
                }}
              />
              {/* Product Owner Name field */}
              <TextField
                id="productOwnerName"
                name="productOwnerName"
                label="Owner"
                type="text"
                size="small"
                variant="filled"
                value={values.productOwnerName}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
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
                  onChange={(e) => {
                    handleChange(e);
                    saveFieldValues(values);
                  }}
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
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                sx={{
                  marginTop: 1,
                  marginBottom: 5,
                  gridColumn: "span 2"
                }}
              />
              {/* Add Product Button. Can only be pressed when required fields are populated */}
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                onClick={() => setIsAddProdDialOpen(true)}
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
                Add Product
              </Button>
              {/* Clear Fields Button */}
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={() => setIsClearDialOpen(true)}
                disabled={isSubmitting}
              >
                Clear
              </Button>
              {/* Dialogs */}
              <ConfirmAddProdDialog
                isOpen={isAddProdDialOpen}
                setIsOpen={setIsAddProdDialOpen}
                handleSubmit={handleSubmit}
              />
              <ConfirmClearDialog
                isOpen={isClearDialOpen}
                setIsOpen={setIsClearDialOpen}
                clearFields={clearFieldValues}
                resetForm={resetForm}
              />
              <AddProdErrorDialog
                isOpen={isErrorDialOpen}
                setIsOpen={setIsErrorDialOpen}
                errorRef={errorRef}
                setIsModalOpen={setIsOpen}
              />
            </FormContainer>
          )}
          {/* End Formik child component (end form) */}
        </Formik>
      </ModalContainer>
    </Modal>
  );
}
