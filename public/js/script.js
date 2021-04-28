$(document).ready(function(){
    $('.modal').modal();
  });



console.log('success')

const dates = document.getElementById('dates')

function initial(){
    let currentDate = new Date()
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)

    let datesOnCalendar = ''
    let dateCount = 0

    for(let i = firstDay.getDay(); i > 0 ; i--){
        dateCount++
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1-i)
        let bit = 8
        let x = false
        let dateObj
        let dateTag = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    //     Calendar.findById(dateTag, function(err, calendar){
    //         calendar.dates.forEach(function(d){
    //             if(d.date === dateTag){
    //                 x = true
    //                 dateObj = d
    //                 return
    //             }
    //         })
    //         if(!x){
    //             calendar.dates.push({date: dateTag})
    //             calendar.dates.forEach(function(d){
    //                 if(d.date === dateTag){
    //                     dateObj = d
    //                     return
    //                 }
    //             })
    //             calendar.save()
    //         }
    //     })

    //     datesOnCalendar += `<a href="#${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" class="btn modal-trigger">${d.getDate()}</a>
    //     <div class="modal" id="${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}">
    //         <div class="modal-content"><p>test</p></div>
    //     </div>`
    //     // `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" method="POST" class="prev"><input type="submit" value="${d.getDate()}"></form>`
    // }

    for(let i = 1; i<= lastDate.getDate(); i++){
        dateCount++
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        datesOnCalendar += `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" method="POST"><input type="submit" value="${i}"></form>`
    }

    for(let i = 1; i <= 42-dateCount; i++){
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDate.getDate()+i)
        datesOnCalendar += `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}"  method="POST" class="next"><input type="submit" value="${d.getDate()}"></form>`
    }

    dates.innerHTML = datesOnCalendar
}

initial()