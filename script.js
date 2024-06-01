
let noteName = ""
let noteInput = ""
let noteCounter = ""
let time = ""
let Notes = [
  
]

$(document).ready(function () {
  $(".addButton").on("click", function () {

    noteTitle = $(".inputName").val()
    noteInput = $(".inputNote").val()
    let blackboxAi = {
      title: noteName,
      text: noteInput,
      isCompleted: false

    }
    Notes.push(blackboxAi)
    console.log(Notes)
  })

  $(".deleteNote").on("click", function () {

  })


  new Date().getTime()



  new Date(data).toDateString()//перетворить час в звичайний формат

  JSON.parse(localStorage.getItem("data"))//отимати інфо з локальної памяті

  localStorage.setItem("data", (JSON.stringify(data)))//записати інформацію в локальну память і сватнуть всех



  console.log()























});








