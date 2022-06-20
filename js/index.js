const itemLibrary = document.getElementById("item-library")
const itemLibraryData = getItems(); 
let pageIndex = 0

function loadPage() {
  getItems()
    .then((items) => renderItems(items))
    .catch((e) => console.log(e))
}

async function getItems() {
  const response = await fetch("http://acnhapi.com/v1a/houseware")
  const data = await response.json()
  return data.slice(pageIndex * 10, (pageIndex + 1) * 10)
}

function getItemsHtml(item) {
  return `<div>
            <img src="${item[0].image_uri}" alt="Image of ${item[0].name["name-USen"]}">
          </div>`
}

function changeIndex() {
    pageIndex++
    loadPage()
}

async function renderItems(items) {
  itemLibrary.innerHTML = items.map(getItemsHtml).join("")
}

loadPage()
// function getItemsHtml(item) {
//     return item.map((type) => {
//     return `<div>
//                 <img src="${type.image_url}" alt="Image of ">
//             </div>`;
//     });
// }

document.getElementById("next-page").addEventListener("click", changeIndex);
