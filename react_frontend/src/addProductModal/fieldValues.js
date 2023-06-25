/**
 * Saves the form fields values between modal closes
 */

const initialValues = {
  productName: "",
  productOwnerName: "",
  scrumMasterName: "",
  developer1Name: "",
  developer2Name: "",
  developer3Name: "",
  developer4Name: "",
  developer5Name: "",
  startDate: "",
  methodology: "",
  location: "https://github.com/bcgov/"
};

let fieldValues = { ...initialValues };

function getFieldValues() {
  return fieldValues;
}

function clearFieldValues() {
  fieldValues = { ...initialValues };
  return fieldValues;
}

function saveFieldValues(values) {
  fieldValues = { fieldValues, ...values };
}

export { getFieldValues, clearFieldValues, saveFieldValues };
