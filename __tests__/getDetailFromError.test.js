const { getDetailFromError } = require('../src/getDetailFromError')

describe('getDetailFromError', () => {
  test('should catch axios error without response', () => {
    const error = {
      name: 'AxiosError',
      code: 'ECONABORTED',
      isAxiosError: true,
      message: 'connection aborted',
      config: {
        method: 'get',
        url: '/api/fake/12345',
        baseURL: 'https://fake-data.com',
      },
    }

    const detail = getDetailFromError(error)

    expect(detail).toEqual({
      name: 'AxiosError',
      origin: 'fake-data.com',
      endpoint: '[GET] /api/fake/12345',
      message: 'connection aborted',
    })
  })

  test('should catch axios error with response', () => {
    const error = {
      name: 'AxiosError',
      code: '400',
      isAxiosError: true,
      message: 'request is resolved with 400 status code',
      config: {
        method: 'get',
        url: '/api/fake/12345',
        baseURL: 'https://fake-data.com',
      },
      response: {
        status: 400,
        data: {
          code: 'NOT_FOUND_ERROR',
          message: 'this resource is not found',
        },
      },
    }

    const detail = getDetailFromError(error)

    expect(detail).toEqual({
      name: 'AxiosError',
      origin: 'fake-data.com',
      endpoint: '[GET] /api/fake/12345',
      message: 'this resource is not found',
      status: 400,
      response: {
        code: 'NOT_FOUND_ERROR',
        message: 'this resource is not found',
      },
    })
  })

  test('should catch axios error and return detail message', () => {
    const error = {
      name: 'AxiosError',
      code: '500',
      isAxiosError: true,
      message: 'Resquest failed with status code 500',
      config: {
        method: 'get',
        url: '/api/fake/12345',
        baseURL: 'https://fake-data.com',
      },
      response: {
        status: 500,
        data: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Sorry, an unexpected error occurred',
          detail: {
            message: 'Request failed with status code 502',
          },
        },
      },
    }

    const detail = getDetailFromError(error)

    expect(detail.message).toEqual('Request failed with status code 502')
  })

  test('should catch a Error', () => {
    const error = new Error('any_error')

    const detail = getDetailFromError(error)

    expect(detail).toEqual({
      name: 'Error',
      stack: error.stack,
      message: 'any_error',
    })
  })
})
