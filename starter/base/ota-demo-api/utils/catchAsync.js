// Needs to return a function so that Express can call
// it later on when the 'route' is hit. If not, then
// this function 'fn' will be called immediately.
module.exports = fn => {
    return (req, res, next) => {
        // Next will automatically be called with the value
        // that is passed to it.
        //
        // Since a promise will be returned, all promises
        // have a catch() method that can be called in
        // there is an error. A reject... the error gets
        // passed into the next() method.
        fn(req, res, next).catch(next);
    }
}