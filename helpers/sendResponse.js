export default function sendResponse(res, status = 200, data = null, error = false, msg = "Request was successful") {
    if (![200, 201, 400, 404, 500].includes(status)) {
      status = 500;
      msg = "Internal Server Error";
      error = true;
    }
    res.status(status).json({
      error,
      msg,
      data: data ?? null,
    });
  }
  