// blocking code
// const me = 'dime';

// blocking code is an issue when we have a routes and api
// server that can handle as many requests per second as possible

// async code does not happen on the current stack
// it happens on a different stack

// don't do cpu intensive oprations synchronously
const fs = require('fs');
const path = require('path');
const result = fs.readFileSync(path.join(__dirname, 'package.json'));
console.log(result);