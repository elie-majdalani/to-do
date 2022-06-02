var lists
var table = document.getElementById("table")
var tableDone = document.getElementById("tableDone")
var btn1 = '<button style = "margin-right: 4px" type="button" class="btn btn-primary edit-button">Done</button>'
var btn2 = '<button type="button" class="btn btn-danger delete-button" data-bs-toggle="modal" data-bs-target="#delete">Delete</button></td></tr>'
var html = ''
var doneHtml = ''
var today = new Date();
var time = (today.getHours()+ ":" + today.getMinutes())
var dateToday = (today.getFullYear()+ "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0'))
// Get the modal
var modal = document.getElementById("adds");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = 'block';
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
// takes the data adds the task to storage
$("#add-task").click(function (e) {
  id = Math.random().toString(36).substring(7)
  title = document.getElementById("title").value
  description = document.getElementById("description").value
  for (level in document.getElementsByClassName("level")) {
    if (document.getElementsByClassName("level")[level].checked)
      point = document.getElementsByClassName("level")[level].value
  }
  date = document.getElementById("daytime")
  debugger
  task = { id: id, title: title, description: description, status: false, point: point, date: date.value }
  window.localStorage.setItem(id, JSON.stringify(task))
  location.reload();
})

//adds the elements and buttons to the table
function update() {

  lists = localStorage

  for (const list in lists) {
    if (typeof lists[list] === 'string') {
      info = JSON.parse(lists[list])

      if (info.status == true) {
        btn1 = '<button style = "margin-right: 4px" type="button" class="edit-button">Undo</button>'
        doneHtml = doneHtml + "<tr  style='background:lightgray'><td style='display:none' >" + info.id + "</td><td>" + info.title + "</td><td>" + info.description + "</td><td>" + info.point + "</td><td>" + info.date + "</td><td>"
        doneHtml = doneHtml + '<div class="badge bg-success status">Done</div></td><td>'
        doneHtml = doneHtml + btn1
        doneHtml = doneHtml + btn2
      }
      else {
        dateTime = info.date.split('T')
        if (dateToday === dateTime[0]) {
          hour1=dateTime[1].split(':')
          hour2=time.split(':')
          debugger
          if((parseInt(hour2[0])-parseInt(hour1[0]))<1){
            html = html + "<tr  style='background-color:#ff0000'><td style='display:none' >" + info.id + "</td><td>" + info.title + "</td><td>" + info.description + "</td><td>" + info.point + "</td><td>" + info.date + "</td><td>"
            html = html + '<div class="status">Not Done</div></td><td>'
            html = html + btn1
            html = html + btn2
          }
          else{
            html = html + "<tr><td style='display:none' >" + info.id + "</td><td>" + info.title + "</td><td>" + info.description + "</td><td>" + info.point + "</td><td>" + info.date + "</td><td>"
            html = html + '<div class="status">Not Done</div></td><td>'
            html = html + btn1
            html = html + btn2
          }
        }
      }

    }
  }

  table.innerHTML = html
  tableDone.innerHTML = doneHtml
}
// to delete the task when delete is clicked
$(document).on('click', ".delete-button", function (e) {
  deleteId = $(e.target).parent().parent()[0].children[0].textContent
  deleterow = $(e.target).parent().parent()
  deleterow.remove()
  window.localStorage.removeItem(deleteId)
});
// to edit the task and make it done
$(document).on('click', ".edit-button", function (e) {
  editId = $(e.target).parent().parent()[0].children[0].textContent
  let change = JSON.parse(window.localStorage.getItem(editId))

  if (change.status) {
    change.status = false
    localStorage.setItem(editId, JSON.stringify(change))
  }
  else {
    change.status = true
    localStorage.setItem(editId, JSON.stringify(change))
  }

  location.reload();

});
//sorts on a given column title on click

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
  v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
  const table = th.closest('table');
  const tbody = table.querySelector('tbody');
  Array.from(tbody.querySelectorAll('tr'))
    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
    .forEach(tr => tbody.appendChild(tr));
})));
// sorts on a given column title on click idea taken and adapted from:
//https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript/49041392#49041392
update()