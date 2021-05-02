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
    let calendarDates = {}
    Calendar.findById(req.user.id, function(err, calendar){
        let currentDate = new Date()
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)

        for(i = firstDay.getDay(); i>0; i--){
            let newDate = new Date()
            newDate.setDate(firstDay.getDate()-i)
            dateTag = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
            let dateExists = calendar.dates.find(d => d.date === dateTag)
            if(!!dateExists){
                calendarDates[dateTag] = dateExists
            }else{
                req.body.date = dateTag
                calendar.dates.push(req.body)
                calendar.save()
                calendarDates[dateTag] = calendar.dates.find(d => d.date === dateTag)
            }
        }
        for(i=1; i<5; i++){
            for(x = 1; x <= lastDate.getDate(); x++){
                let newDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), x)
                dateTag = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
                let dateExists = calendar.dates.find(d => d.date === dateTag)
                if(!!dateExists){
                    calendarDates[dateTag] = dateExists
                }else{
                    req.body.date = dateTag
                    calendar.dates.push(req.body)
                    calendar.save()
                    calendarDates[dateTag] = calendar.dates.find(d => d.date === dateTag)
                }
            }
            lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1+i, 0)
        }
        res.render('calendar/index', {
            user: req.user,
            calendarDates
        })
    })
}

function show(req, res){
    let x = false
    let dateObj
    Calendar.findById(req.user.id, function(err, calendar){
        dateObj = calendar.dates.find(d => d.date === req.params.id)

        res.render('calendar/show',{
            user: req.user,
            todo: dateObj.todo,
            id: req.params.id,
        })
    })
}
