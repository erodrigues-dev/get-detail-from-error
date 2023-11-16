const getDetailFromError = (error) => {
  if (error.isAxiosError) {
    const { config, response, message } = error;
    return {
      name: `${error.name}:${error.code}`,
      endpoint: `[${config.method.toUpperCase()}] ${config.url}`,
      message:
        response?.data?.detail?.message || response?.data?.message || message,
      status: response?.status,
      response: response?.data,
    };
  }

  return {
    name: error.name,
    stack: error.stack,
    message: error.message,
  };
};

module.exports = { getDetailFromError };
