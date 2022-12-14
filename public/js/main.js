const deleteBtn = document.querySelectorAll('.del')
const medLogItem = document.querySelectorAll('td.not')
const medLogComplete = document.querySelectorAll('td.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteMedLog)
})

Array.from(medLogItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(medLogComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteMedLog(){
    const medLogId = this.parentNode.dataset.id
    try{
        const response = await fetch('medlogs/deleteMedLog', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'medLogIdFromJSFile': medLogId
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
    const medLogId = this.parentNode.dataset.id
    try{
        const response = await fetch('medlogs/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'medLogIdFromJSFile': medLogId
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
    const medLogId = this.parentNode.dataset.id
    try{
        const response = await fetch('medlogs/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'medLogIdFromJSFile': medLogId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}