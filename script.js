
  let noteName = "";
  let noteInput = "";
  let noteCounter = "";
  let time = "";
  let Notes = [];

  $(document).ready(function () {
   
    $(".addButton").on("click", function () {

      if($(".inputName").val() == ""  &&  $(".inputNote").val() == "" 
      || $(".inputNote").val() == "" || $(".inputName").val() == "" )  {
        alert("Заповніть всі поля")
        $(".inputName").val("") ;
        $(".inputNote").val("") ; 
      }else{


      noteName = $(".inputName").val();
      noteInput = $(".inputNote").val();
      time = new Date().toLocaleString();
      
      let blackboxAi = {
        title: noteName,
        text: noteInput,
        time: time,
        isCompleted: false,
      };
      let note =`
        <div class="note">
            <h1 class="Name">${blackboxAi.title}</h1>
            <p class="noteContext">${blackboxAi.text}</p>
            <p class="date">${blackboxAi.time}</p>
            <div class="NoteButtons">
              <button class="deleteButton">Видалити<i class="fa-solid fa-trash"></i></button>
              <button class="correctButton">Виправити<i class="fa-solid fa-check"></i></button>
              <button class="editButton">Архівувати<i class="fa-regular fa-pen-to-square"></i></button>
            </div>
          </div>
      ` 
      $(".Notes").append(note)
      Notes.push(blackboxAi);
      $(".inputName").val("") ;
      $(".inputNote").val("") ;
      console.log(Notes);
    }


    })//add button on click

  $(document).on("click", ".editButton",  function () {
    $(this).parent().parent().toggleClass("archievedButton");

    if($(this).parent().parent().hasClass("archievedButton")){
      isCompleted = true;
      $(this).parent().parent().find(".Name").css("text-decoration", "line-through");
      $(this).parent().parent().find(".noteContext").css("text-decoration", "line-through");
      $(this).parent().parent().find(".date").css("text-decoration", "line-through");
      $(this).parent().parent().find(".Name").css("opacity", "0.7");
      $(this).parent().parent().find(".noteContext").css("opacity", "0.7");
      $(this).parent().parent().find(".date").css("opacity", "0.7");
      
      $(this).parent().parent().find(".correctButton").css("z-index", "-100");


    }else{
      isCompleted = false;
      $(this).parent().parent().find(".Name").css("text-decoration", "none");
      $(this).parent().parent().find(".noteContext").css("text-decoration", "none");
      $(this).parent().parent().find(".date").css("text-decoration", "none");
      $(this).parent().parent().find(".Name").css("opacity", "1");
      $(this).parent().parent().find(".noteContext").css("opacity", "1");
      $(this).parent().parent().find(".date").css("opacity", "1");

      $(this).parent().parent().find(".correctButton").css("z-index", "0");
    }
  })//edit button on click
  
  $(document).on("click", ".deleteButton", function () {
    $(this).parent().parent().remove();

    for (let i = 0; i < Notes.length; i++) {
      if (Notes[i].title == $(this).parent().parent().find(".Name").text()) {
        Notes.splice(i, 1);

        console.log(Notes);
      }
    }
  })

  $(document).on("click", ".correctButton", function () {
    $(".overlay").css("display", "flex");
    $(".overlay").css("z-index", "1");
    //redacting code(for next time)






    $("saveButton").on("click", function () {
      $(".overlay").css("display", "none");
      $(".overlay").css("z-index", "-100");
    })
    

        })
 


  
  const data = new Date().getTime();
  console.log(new Date(data).toDateString()); //перетворить час в звичайний формат

  console.log(JSON.parse(localStorage.getItem("data"))); //отимати інфо з локальної памяті

  localStorage.setItem("data", JSON.stringify(data)); //записати інформацію в локальну память і сватнуть всех
});















































