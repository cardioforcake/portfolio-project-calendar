const { render } = require('ejs')
const Calendar = require('../models/calendar')

module.exports ={
    index,
    add,
    del,
    update,
    move,
}

function move(req, res){
    if(!!req.body.date){
        Calendar.findById(req.user.id, function(err, calendar){
            let newDate = new Date(req.body.date + "T00:00")
            let dateTag = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
            let currentDateObj = calendar.dates.find(d => d.date === req.params.id)
            let taskObj = currentDateObj.todo.find(t=> t.id === req.params.task)
            currentDateObj.todo.pull(req.params.task)
            let dateObj = calendar.dates.find(d => d.date === dateTag)
            dateObj.todo.push(taskObj)
            calendar.save(function(err){
                res.redirect('/calendar')
            })
        })
    }else{
        res.redirect('/calendar')
    }
}

function update(req, res){
    Calendar.findById(req.user.id, function(err, calendar){
        let dateObj = calendar.dates.find(d => d.date === req.params.id)
        let taskObj = dateObj.todo.find(t => t.id === req.params.task)
        taskObj.description = req.body.description
        if(req.body.complete){
            taskObj.complete = true
        }else{
            taskObj.complete = false
        }
        calendar.save(function(err){
            res.redirect('/calendar')
        })
    })
}

function del(req, res){
    Calendar.findById(req.user.id, function(err, calendar){
        let dateObj = calendar.dates.find(d => d.date === req.params.id)
        dateObj.todo.pull(req.params.task)
        calendar.save(function(err){
            res.redirect('/calendar')
        })
    })
}

function add(req, res){
    Calendar.findById(req.user.id, function(err, calendar){
        let dateObj = calendar.dates.find(d => d.date === req.params.id)
        dateObj.todo.push(req.body)
        calendar.save(function(err){
            res.redirect('/calendar')
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
