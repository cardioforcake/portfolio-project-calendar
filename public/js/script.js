console.log('success')

const dates = document.getElementById('dates')

function initial(){
    let currentDate = new Date()
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)

    let datesOnCalendar = ''

    for(let i = firstDay.getDay(); i > 0 ; i--){
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1-i)
        datesOnCalendar += `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" method="POST" class="prev"><input type="submit" value="${d.getDate()}"></form>`
    }

    for(let i = 1; i<= lastDate.getDate(); i++){
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        datesOnCalendar += `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}" method="POST"><input type="submit" value="${i}"></form>`
    }

    for(let i = 1; i < 7 - lastDate.getDay(); i++){
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDate.getDate()+i)
        datesOnCalendar += `<form action="/calendar/show/${d.getFullYear()}-${d.getMonth()+1}/${d.getDate()}"  method="POST" class="next"><input type="submit" value="${d.getDate()}"></form>`
    }

    dates.innerHTML = datesOnCalendar
}

initial()