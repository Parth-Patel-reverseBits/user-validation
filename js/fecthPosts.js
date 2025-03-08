

let clonedArray = []

// fecthing resources function 
async function getData() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    clonedArray = json
    displayData(clonedArray)
  } catch (error) {
    console.error(error.message);
  }
}

getData()


// display data function
function displayData(array) {
  let tableBody = document.getElementById("table-body");
  let extractedData = array.map((item) => `<tr id="${item.id}">` + "<td>" +  item.userId + "</td>"  + "<td>" +  item.id + "</td>" + "<td>" +  item.title + "</td>" + "<td>" +  item.body + "</td>" + "<td>" + `<span onclick="deleteData(${item.id})" data-bs-toggle="modal" data-bs-target="#deleteModal" style="cursor: pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/> </svg></span>` + `<span onclick="filledData(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor:pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/> </svg></span>` + "</td>" + "</tr>")
  tableBody.innerHTML = extractedData.join("")
  // console.log(clonedArray)
}

function addData() {
  // Get the values from the input fields by their ids
  
  

  const userId = document.getElementById('add-name').value;
  const id = document.getElementById('add-text').value;
  const title = document.getElementById('add-title').value;
  const body = document.getElementById('add-body').value;

  // You can now log or use the values as needed

  let userData = {}
  userData["userId"] = userId;
  userData["id"] = id;
  userData["title"] = title;
  userData["body"] = body;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  clonedArray.unshift(userData)
  displayData(clonedArray)
  document.getElementById('add-name').value = '';
  document.getElementById('add-text').value = '';
  document.getElementById('add-title').value = '';
  document.getElementById('add-body').value = '';
}

// filledData function  for update model

let dataId = ""

let oldIndex = ""

function filledData(id)  {
  dataId = id
  const allData = document.getElementById(`${dataId}`); // The <tr> element
  const allTds = allData.getElementsByTagName('td'); // Get all <td> elements within the <tr>

  let tdValues = [];
  for (let td of allTds) {
    tdValues.push(td.innerText); // Get the innerText of each <td> and store it in the array
  }

  oldIndex = tdValues[1]

  document.getElementById('recipient-name').value = tdValues[0];
  document.getElementById('message-text').value = tdValues[1];
  document.getElementById('message-title').value = tdValues[2];
  document.getElementById('message-body').value = tdValues[3];
}

function updateData() {
  let userId =  document.getElementById('recipient-name').value
  let id = document.getElementById('message-text').value
  let title = document.getElementById('message-title').value
  let body = document.getElementById('message-body').value
  
  let index_value = clonedArray.findIndex((item) => item.id == oldIndex)
  clonedArray[index_value].userId = userId
  clonedArray[index_value].id = parseInt(id)
  clonedArray[index_value].title = title
  clonedArray[index_value].body = body

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title,
      body: body,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  


  displayData(clonedArray)
}





let deleteId = ""

// delete data function
function deleteData(id) {
  deleteId = id
}
// model delete function
const callDeleteData = () => {
  // document.getElementById(deleteId).remove()

  
  fetch(`https://jsonplaceholder.typicode.com/posts/${deleteId}`, {
    method: 'DELETE',
  });

  // console.log(clonedArray)
  function findIndexById() {
    return clonedArray.findIndex(item => item.id === deleteId);
  }
  const index = findIndexById();
  clonedArray.splice(index,1)
  displayData(clonedArray)
}


