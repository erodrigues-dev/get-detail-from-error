# get-detail-from-error

[![Publish Package to npmjs](https://github.com/erodrigues-dev/get-detail-from-error/actions/workflows/publish.yml/badge.svg)](https://github.com/erodrigues-dev/get-detail-from-error/actions/workflows/publish.yml)
[![npm version](https://badge.fury.io/js/get-detail-from-error.svg)](https://www.npmjs.com/package/get-detail-from-error)

## Catching Errors

- Axios Error
- Error

## Result format

```js
// for Error type
{
  name: 'string', // error.name
  stack: 'string', // error.stack
  message: 'string' // error.message
}

// for AxiosError type
{
  name: 'string', // error.name + error.code
  endpoint: 'GET /api/fake/12345', // api called
  messsage: 'string', // response.detail.message or  response.message or error.message
  status: 400, // response status code
  response: { } // response data
}

```