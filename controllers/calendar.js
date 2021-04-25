const { render } = require('ejs')
const Calendar = require('../models/calendar')

module.exports ={
    index,
    show,
    add,
    del,
    update,
}

function update(req, res){
    Calendar.findById(req.user.id, function(err, calendar){
        calendar.dates.forEach(function(d){
            if(d.date === req.params.id){
                d.todo.forEach(function(t){
                    if(t.id === req.params.task){
                        t.task = req.body.task
                        t.description = req.body.description
                    }
                })
            }
        })
        calendar.save(function(err){
            res.redirect(`/calendar/show/${req.params.id}`)
        })
    })
}

function del(req, res){
    Calendar.findById(req.user.id, function(err, calendar){
        calendar.dates.forEach(function(d){
            if(d.date === req.params.id){
                d.todo.pull(req.params.task)
            }
        })
        calendar.save(function(err){
            res.redirect(`/calendar/show/${req.params.id}`)
        })
    })
}

function add(req, res){
    Calendar.findById(req.user.id, function(err, calendar){
        calendar.dates.forEach(function(d){
            if(d.date === req.params.id){
                d.todo.push(req.body)
            }
        })
        calendar.save(function(err){
            res.redirect(`/calendar/show/${req.params.id}`)
        })
    })
}

function index(req, res){
    res.render('calendar/index', {
        user: req.user
    })
}

function show(req, res){
    let x = false
    let dateObj
    Calendar.findById(req.user.id, function(err, calendar){
        // let year = req.params.year
        // let month = req.params.month
        // let date = req.params.date
        calendar.dates.forEach(function(d){
            if(d.date === req.params.id){
                x = true
                dateObj = d
                return
            }
            // else{
            //     x = false
            // }
        })
        if(!x){
            req.body.date = req.params.id
            calendar.dates.push(req.body)
            calendar.dates.forEach(function(d){
                if(d.date === `${year}-${month}-${date}`){
                    dateObj = d
                    return
                }
            })
            calendar.save(function(err){
                res.render('calendar/show',{
                    user: calendar,
                    todo: dateObj.todo,
                    id: req.params.id,
                })
            })
        }else{
            res.render('calendar/show',{
                user: calendar,
                todo: dateObj.todo,
                id: req.params.id,
            })
        }
    })

}