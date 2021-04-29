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
    let dateObj


    let calendarDates = {}


    Calendar.findById(req.user.id, function(err, calendar){
        let currentDate = new Date()
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)

        for(i = firstDay.getDay(); i>0; i--){
            let newDate = new Date()
            newDate.setDate(firstDay.getDate()-i)
            let dateExists = calendar.dates.find(d => d.dates === `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`)
            if(!!dateExists){
                calendarDates[`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`] = dateExists
            }else{
                req.body.date = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
                calendar.dates.push(req.body)
                calendar.save()
                calendarDates[`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`] = calendar.dates.find(d => d.dates === `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`)
            }
        }

        for(i=1; i<4; i++){
            for(i = 1; i <= lastDate.getDate(); i++){
                let newDate = new Date()
                newDate.setMonth(lastDate.getMonth())
                newDate.setDate(i)
                let dateExists = calendar.dates.find(d => d.dates === `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`)
                if(!!dateExists){
                    calendarDates[`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`] = dateExists
                }else{
                    req.body.date = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
                    calendar.dates.push(req.body)
                    calendar.save()
                    calendarDates[`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`] = calendar.dates.find(d => d.dates === `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`)
                }
            }
            lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1+i, 0)
        }
        calendarDates['test'] = 'success'

        res.render('calendar/index', {
            user: req.user,
            dates: calendarDates,
            calendarDates: calendarDates
        })
    })




}

function show(req, res){
    let x = false
    let dateObj
    Calendar.findById(req.user.id, function(err, calendar){
        dateObj = calendar.dates.find(d => d.date === req.params.id)

        res.render('calendar/show',{
            user: calendar,
            todo: dateObj.todo,
            id: req.params.id,
        })
    })
        // calendar.dates.forEach(function(d){
        //     if(d.date === req.params.id){
        //         x = true
        //         dateObj = d
        //         return
        //     }
        // })
        // if(!x){
        //     req.body.date = req.params.id
        //     calendar.dates.push(req.body)
        //     calendar.dates.forEach(function(d){
        //         if(d.date === req.params.id){
        //             dateObj = d
        //             return
        //         }
        //     })
        //     calendar.save(function(err){
        //         res.render('calendar/show',{
        //             user: calendar,
        //             todo: dateObj.todo,
        //             id: req.params.id,
        //         })
        //     })
        // }else{

    //     }
    // })

}