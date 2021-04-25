const { render } = require('ejs')
const express = require('express')

module.exports ={
    index,
}

function index(req, res){
    res.render('calendar/index', {
        user: req.user
    })
}