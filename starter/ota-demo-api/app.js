const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const readPointRouter = require('./routes/readPointRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// NOTES:
// When adding middleware, it's important to know that
// order matters

// 1) GLOBAL MIDDLEWARES
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

// app.use(cors(corsOptions));
app.use(cors());

app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'ota-demo-api'))); // YES

// Set Security HTTP headers
// Currently using the default options.
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
// Allow 100 req from the same IP in 1 hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

// Helps with Denial of Service attacks and
// brute force attacks
//
// Adds info to the Header
// X-Powered-By
// X-RateLimit-Limit
// X-RateLimit-Remaining
app.use('/api', limiter);

// Middleware
// Data from the body is added to the
// request object
// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb' // limits the body size, nothing larger than 10kb
  })
);

// This is needed to parse data coming from a URL encoded form
// extended allows for more complex data to be passed
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

// Data sanitization against XSS (Cross-Site Scripting Attacks)
// Cleans the HTML code 'input'
app.use(xss());

// Prevent parameter pollution
// Needs to be used towards the end because it cleans up the query string
app.use(hpp());

// Compresses all the text sent to clients, helps with file sizes
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(`HEADERS: ${JSON.stringify(req.headers)}`);
  // console.log(`COOKIES: ${JSON.stringify(req.cookies)}`);
  next();
});

const apiUrlRoot = process.env.API_ROOT;
const apiVersion = process.env.API_VERSION;
const url = `/${apiUrlRoot}/${apiVersion}`;
console.log(url);

// Template Routes
// app.use("/", viewRouter);

// API Routes
app.use(`${url}/read-points`, readPointRouter);
app.use(`${url}/users`, userRouter);

app.all('*', (req, res, next) => {
  next();
});

// app.use(globalErrorHandler);

module.exports = app;
