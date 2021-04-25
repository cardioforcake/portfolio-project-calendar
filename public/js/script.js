console.log('success')

const dates = document.getElementById('dates')

function initial(){
    let currentDate = new Date()
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)

    let datesOnCalendar = ''
    console.log(lastDate)
    console.log(firstDay.getDay())

    for(let i = firstDay.getDay(); i > 0 ; i--){
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1-i)
        datesOnCalendar += `<div class="prev">${d.getDate()}</div>`
    }

    for(let i = 1; i<= lastDate.getDate(); i++){
        datesOnCalendar += `<div>${i}</div>`
    }

    for(let i = 1; i < 7 - lastDate.getDay(); i++){
        let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDate.getDate()+i)
        datesOnCalendar += `<div class="next">${d.getDate()}</div>`
    }

    dates.innerHTML = datesOnCalendar
}

initial()