import { useCallback, useState, useRef } from "react";
import { Formik } from "formik";
// import { object, string } from "yup";

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
import ErrorDialog from "./ErrorDialog";

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

// Additional validattions, use if needed
// const validationSchema = object({
//   // nickname: string().required().trim().min(2).max(50),
//   // password: string().required().min(5).max(100)
// });

// Modal containing the form to add a new product
export default function AddProductModal({ isOpen, setIsOpen, dispatch }) {
  // Used to open or close submit and clear confirmation dialogs
  const [isAddProdDialOpen, setIsAddProdDialOpen] = useState(false);
  const [isClearDialOpen, setIsClearDialOpen] = useState(false);
  // Used to open the error dialog when submit fails
  const [isErrorDialOpen, setIsErrorDialOpen] = useState(false);
  const { current: errorObj } = useRef({});

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
          // Request was successful
          // Indicates whether or not API successfully committed the data
          const resObj = await response.json();
          if (resObj.wasSuccessful) {
            // Update the interface with optimistic response
            dispatch({ type: "addedNewProd", data: resObj.data });
            resetForm({ values: clearFieldValues() });
            setIsOpen(false);
          } else {
            errorObj.errorType = "Validation Error";
            errorObj.errorMsg = resObj.error;
            setIsErrorDialOpen(true);
          }
        })
        .catch((error) => {
          // Request failed. There was a network error
          errorObj.errorType = "Network Error";
          errorObj.errorMsg = error;
          setIsErrorDialOpen(true);
        });
    },
    [dispatch, setIsOpen, errorObj]
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
          {({
            values,
            handleChange,
            handleSubmit,
            // errors,
            handleBlur,
            isSubmitting,
            // touched,
            resetForm
          }) => (
            <FormContainer>
              {/* Product Name field*/}
              <TextField
                id="productName"
                name="productName"
                label="Product Name"
                // helperText={errors?.productName && touched.productName && errors.productName}
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
                // error={errors?.productName && touched.productName}
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
                // helperText={
                //   errors?.productOwnerName && touched.productOwnerName && errors.productOwnerName
                // }
                type="text"
                size="small"
                variant="filled"
                value={values.productOwnerName}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.productOwnerName && touched.productOwnerName}
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
                // helperText={
                //   errors?.scrumMasterName && touched.scrumMasterName && errors.scrumMasterName
                // }
                type="text"
                size="small"
                variant="filled"
                value={values.scrumMasterName}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.scrumMasterName && touched.scrumMasterName}
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
                Enter up to 5 developers
              </Typography>
              {/* Developer 1 Name */}
              <TextField
                id="developer1Name"
                name="developer1Name"
                label="Developer 1"
                // helperText={
                //   errors?.developer1Name && touched.developer1Name && errors.developer1Name
                // }
                type="text"
                size="small"
                variant="filled"
                value={values.developer1Name}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.developer1Name && touched.developer1Name}
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
                // helperText={
                //   errors?.developer2Name && touched.developer2Name && errors.developer2Name
                // }
                type="text"
                size="small"
                variant="filled"
                value={values.developer2Name}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.developer2Name && touched.developer2Name}
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
                // helperText={
                //   errors?.developer3Name && touched.developer3Name && errors.developer3Name
                // }
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
                // error={errors?.developer3Name && touched.developer3Name}
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
                // helperText={
                //   errors?.developer4Name && touched.developer4Name && errors.developer4Name
                // }
                type="text"
                size="small"
                variant="filled"
                value={values.developer4Name}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.developer4Name && touched.developer4Name}
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
                // helperText={
                //   errors?.developer5Name && touched.developer5Name && errors.developer5Name
                // }
                type="text"
                size="small"
                variant="filled"
                value={values.developer5Name}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.developer5Name && touched.developer5Name}
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
                // helperText={errors?.startDate && touched.startDate && errors.startDate}
                type="text"
                size="small"
                variant="outlined"
                value={values.startDate}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.startDate && touched.startDate}
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
                // helperText={errors?.location && touched.location && errors.location}
                type="text"
                size="small"
                variant="filled"
                value={values.location}
                onChange={(e) => {
                  handleChange(e);
                  saveFieldValues(values);
                }}
                onBlur={handleBlur}
                // error={errors?.location && touched.location}
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
              <ErrorDialog
                isOpen={isErrorDialOpen}
                setIsOpen={setIsErrorDialOpen}
                errorType={errorObj.errorType}
                errorMsg={errorObj.errorMsg}
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
