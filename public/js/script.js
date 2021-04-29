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
    let dateTest = 3

    for(let i = firstDay.getDay(); i > 0 ; i--){
        dateCount++
        let newDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1-i)
        let dateTag = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`

        datesOnCalendar += `<a href="#${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}" class="btn modal-trigger">${newDate.getDate()}</a>
        <div class="modal" id="${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}">
            <div class="modal-content"><p>3</p></div>
        </div>`
        // `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" method="POST" class="prev"><input type="submit" value="${d.getDate()}"></form>`
    }

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