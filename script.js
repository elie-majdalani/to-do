var lists
var table = document.getElementById("table")
var tableDone = document.getElementById("tableDone")
var btn1 = '<button style = "margin-right: 4px" type="button" class="btn btn-primary edit-button">Done</button>'
var btn2 = '<button type="button" class="btn btn-danger delete-button" data-bs-toggle="modal" data-bs-target="#delete">Delete</button></td></tr>'
var html = ''
var doneHtml = ''
// Get the modal
var modal = document.getElementById("adds");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display ='block';
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

$("#add-task").click(function (e) {
  id = Math.random().toString(36).substring(7)
  title = document.getElementById("title").value
  description = document.getElementById("description").value
  status = document.getElementsByClassName('check-status').checked
  for (level in document.getElementsByClassName("level")) {
      if (document.getElementsByClassName("level")[level].checked)
          point = document.getElementsByClassName("level")[level].value
  }
  date = new Date().toLocaleString();
  task = { id: id, title: title, description: description, status: status, point: point, date: date }
  window.localStorage.setItem(id, JSON.stringify(task))
  location.reload();
})


function update() {

  lists = localStorage

  for (const list in lists) {
    if(typeof lists[list] === 'string'){
   info = JSON.parse(lists[list])
    debugger
      if (info.status == true) {
        debugger
          btn1 = '<button style = "margin-right: 4px" type="button" class="btn btn-primary edit-button">Undo</button>'
          doneHtml = doneHtml + "<tr  style='background:lightgray'><td style='display:none' >" + info.id + "</td><td>" + info.title + "</td><td>" + info.description + "</td><td>" + info.point + "</td><td>" + info.date + "</td><td>"
          doneHtml = doneHtml + '<div class="badge bg-success status">Done</div></td><td>'
          doneHtml = doneHtml + btn1
          doneHtml = doneHtml + btn2
      }
      else {
        debugger
          html = html + "<tr><td style='display:none' >" + info.id + "</td><td>" + info.title + "</td><td>" + info.description + "</td><td>" + info.point + "</td><td>" + info.date + "</td><td>"
          html = html + '<div class="badge bg-danger status">Not Done</div></td><td>'
          html = html + btn1
          html = html + btn2
      }

  }}

  table.innerHTML = html
  tableDone.innerHTML = doneHtml
}
$(document).on('click', ".delete-button", function (e) {
  deleteId = $(e.target).parent().parent()[0].children[0].textContent
  deleterow = $(e.target).parent().parent()
  deleterow.remove()
  window.localStorage.removeItem(deleteId)
});

update()