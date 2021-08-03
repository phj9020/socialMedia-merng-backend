"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginInput = exports.validateRegisterInput = void 0;

var validateRegisterInput = function validateRegisterInput(username, password, confirmPassword, email) {
  var errors = {};

  if (username.trim() === '') {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === '') {
    errors.email = "email must not be empty";
  } else {
    var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password.trim() === '') {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must match";
  }

  return {
    errors: errors,
    // object errors key length < 1 = no error  valid: true;
    valid: Object.keys(errors).length < 1
  };
};

exports.validateRegisterInput = validateRegisterInput;

var validateLoginInput = function validateLoginInput(email, password) {
  var errors = {};

  if (email.trim("") === '') {
    errors.email = "email must not be empty";
  }

  if (password.trim("") === '') {
    errors.password = "password must not be empty";
  }

  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};

exports.validateLoginInput = validateLoginInput;