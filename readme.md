# get-detail-from-error

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
  messsage: 'string', // response.data.message or error.message
  status: 400, // response status code
  response: {} // response data
}

```