/**
 * Handles errors by redirecting the response to an error page with a specified message.
 * @param {Object} res - The response object.
 * @param {string} message - The error message to be displayed.
 * @returns {void}
 */
function handleError(res, message) {
  return res.redirect(`/error?message=${encodeURIComponent(message)}`);
}

module.exports = handleError;
