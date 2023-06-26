/**
 * Validates the request body, which is supposed to be a JSON object
 * that contains certain keys. This is a bare-bones validation. It can
 * be extended to make validation much more robust if needed in future.
 */
export default function validateFormInput(reqBody) {
  if (typeof reqBody !== "object" || reqBody === null) {
    // Not an object or array
    return false;
  }
  if (!reqBody.hasOwnProperty("productName")) {
    // Does not have the property "productName"
    return false;
  }
  // Passed all validation
  return true;
}