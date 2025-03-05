async function getData() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    addingDataOnTable(json);
  } catch (error) {
    console.error(error.message);
  }
}
getData();

const addingDataOnTable = (array) => {
  console.log(array);
  let tableBody = document.getElementById("table-body");
  let text = "";
  for (let data of array) {
    text += `<tr> <td>${data.userId}</td> <td>${data.id}</td> <td>${data.title}</td> <td>${data.body}</td> </tr>`;
  }
  tableBody.innerHTML = text;
};
