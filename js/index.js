const itemLibrary = document.getElementById("item-library")
const itemLibraryData = await getItems()

let currentPageData = []
let pageIndex = 0

async function getItems() {
  const response = await fetch("http://acnhapi.com/v1a/houseware")
  const data = response.ok ? await response.json() : new Error('Something went wrong')
  return data;
}

function getItem(index){
  return currentPageData[index]
}

function getItemsHtml(items) {
  return items.map((item, index)=>{
    return `<div>
              <img class="item-list" data-index="${index}" src="${item[0].image_uri}" alt="Image of ${item[0].name["name-USen"]}">
            </div>`
  }).join("")
}

function setCurrentItems(){
  currentPageData = itemLibraryData.slice(pageIndex * 10, (pageIndex + 1) * 10)
}

function loadPage() {
  setCurrentItems()
  renderItems(currentPageData)
}

function changeIndex() {
  pageIndex++
  loadPage()
}

async function renderItems(items) {
  document.getElementById("item-library").style.opacity = "0%"
  document.getElementById("item-library").style.display = "none"

  itemLibrary.innerHTML = await getItemsHtml(items)

  setTimeout(()=>{
    document.getElementById("item-library").style.display = "block"
    setTimeout(()=>{
      document.getElementById("item-library").style.opacity = "100%"
    }, 500)
  }, 1000)

  const itemElements = document.querySelectorAll(".item-list")
  itemElements.forEach(itemEl=>{
    itemEl.addEventListener("click", (item)=>{
      getItem(item.currentTarget.dataset.index)
    })
  })
}

loadPage()

document.getElementById("next-page").addEventListener("click", changeIndex);
