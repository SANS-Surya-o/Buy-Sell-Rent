//Wrapper to wrap functions in a promise resolve and catch errors in async functions
// 1. Prevent repetitive try/catch blocks
// 2. Prevents unhandled promise rejections


const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
  
export default asyncHandler;
  