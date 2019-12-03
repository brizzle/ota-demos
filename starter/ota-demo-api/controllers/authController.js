const path = require('path');
const fs = require('fs');
// const crypto = require('crypto');
// const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const userController = require('../controllers/userController');
const bcrypt = require('bcryptjs');

const dataPath = path.join(__dirname, '../dev-data/users.json');

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

async function readDataAsync() {
    const res = await JSON.parse(fs.readFile(data, 'utf-8'));
    return new Buffer(res);
}

const signToken = id => {
    const payload = { id };

    // The secret should be at least 32 characters
    // long when using HS256 encryption.
    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN
    }

    return jwt.sign(payload, secret, options);
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // Converts to milliseconds
        httpOnly: true // Cookie cannot be accessed or modified in any way by the browser
    };

    // Cookie will only be sent on an encrypted connection (HTTPS), activate for PRODUCTION
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        requestedAt: req.requestTime,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;

    const data = readData();
    const newId = data[data.length - 1].id + 1;
    const newUser = Object.assign({ id: newId }, req.body);

    data.push(newUser);

    fs.writeFile(dataPath, JSON.stringify(data), err => {
        newUser.password = undefined;
        createSendToken(newUser, 201, req, res);
    });
});

exports.login = catchAsync(async (req, res, next) => {
    // Example of destructuring...
    const { email, password } = req.body;

    // 1) Check if the email and password exist.
    if (!email || !password) {
        return next(new AppError('Please provide email and password.', 400));
    }

    // 2) Check if the user exists && password is correct.
    const user = await userController.getuserByEmail(email);

    if (!user || !(await userController.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password.', 401));
    }

    // 3) If everything is okay, send token to client.
    createSendToken(user, 200, req, res);
});