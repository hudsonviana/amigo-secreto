export const requestInterceptor = (req, res, next) => {
  console.log(
    `=> ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(
      req.body
    )}`
  );
  next();
};

// https://www.youtube.com/watch?v=mKa1MuB1HMk
// Parei em: 1:20:01
