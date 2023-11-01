const { getDetailFromError } = require("./getDetailFromError");

describe("getDetailFromError", () => {
  test("should catch axios error without response", () => {
    const error = {
      name: "AxiosError",
      code: "ECONABORTED",
      isAxiosError: true,
      message: "connection aborted",
      config: {
        method: "get",
        url: "/api/fake/12345",
      },
    };

    const detail = getDetailFromError(error);

    expect(detail).toEqual({
      name: "AxiosError:ECONABORTED",
      endpoint: "[GET] /api/fake/12345",
      message: "connection aborted",
    });
  });

  test("should catch axios error with response", () => {
    const error = {
      name: "AxiosError",
      code: "400",
      isAxiosError: true,
      message: "request is resolved with 400 status code",
      config: {
        method: "get",
        url: "/api/fake/12345",
      },
      response: {
        status: 400,
        data: {
          code: "NOT_FOUND_ERROR",
          message: "this resource is not found",
        },
      },
    };

    const detail = getDetailFromError(error);

    expect(detail).toEqual({
      name: "AxiosError:400",
      endpoint: "[GET] /api/fake/12345",
      message: "this resource is not found",
      status: 400,
      response: {
        code: "NOT_FOUND_ERROR",
        message: "this resource is not found",
      },
    });
  });

  test("should catch a Error", () => {
    const error = new Error("any_error");

    const detail = getDetailFromError(error);

    expect(detail).toEqual({
      name: "Error",
      stack: error.stack,
      message: "any_error",
    });
  });
});
