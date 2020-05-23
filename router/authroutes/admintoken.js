const express = require('express');
const mongoose = require('mongoose');

const User = require('../../model/user');
const jwt = require('jsonwebtoken');
require('../nodemon.json')

module.exports = async (req, res, next) => {
    const token = req.query.token;
    const decode = jwt.verify(token, 'secret');
    


}