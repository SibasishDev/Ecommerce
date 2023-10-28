
/**
 * @desc    Send any success response
 * @author  Sibasish Das
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */


exports.success = (message,statusCode, result = null) => {
    let successData =  {
        code : statusCode,
        message : message,
    }
    if(result) successData.data = result;
    return successData;
}


/**
 * @desc    Send any error response
 * @author  Sibasish Das
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

exports.error = (message,statusCode,result = null) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

// Get matched code
const findCode = codes.find((code) => code == statusCode);
if(!findCode) statusCode = 500;
else statusCode = findCode;
    let errorData =  {
        code : statusCode,
        message : message
    }
    if(result) errorData.data = result;
    return errorData;
}


/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
exports.validation = (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  };