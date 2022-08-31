const deleteBtn = document.querySelectorAll('.del')
const logItem = document.querySelectorAll('span.not')
const logComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteLog)
})

Array.from(logItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(logComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteLog(){
    const logId = this.parentNode.dataset.id
    try{
        const response = await fetch('logs/deleteLog', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'logIdFromJSFile': logId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const logId = this.parentNode.dataset.id
    try{
        const response = await fetch('logs/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'logIdFromJSFile': logId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const logId = this.parentNode.dataset.id
    try{
        const response = await fetch('logs/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'logIdFromJSFile': logId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}