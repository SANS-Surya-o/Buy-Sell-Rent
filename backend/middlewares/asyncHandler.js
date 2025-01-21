//Wrapper to wrap functions in a promise resolve and catch errors in async functions
// 1. Prevent repetitive try/catch blocks
// 2. Prevents unhandled promise rejections


const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      // res.status(500).json({ error: error.message });
      console.log('Error: ', error.message);
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode).json({
        message : error.message,
        // stack : process.env.NODE_ENV === 'production' ? null : error.stack
      }) 
    });
};
  
export default asyncHandler;
  