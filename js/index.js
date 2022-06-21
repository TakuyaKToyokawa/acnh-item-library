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
    return `<li class="item-library__item">
              <div class="item-library__item-image">
                <img src="${item[0].image_uri}" alt="Image of ${item[0].name["name-USen"]}" data-index="${index}">
              </div>
              <p class="item-library__item-name">${item[0].name["name-USen"]}</p>
            </li>`
  }).join("")
}

function setCurrentItems(){
  currentPageData = itemLibraryData.slice(pageIndex * 18, (pageIndex + 1) * 18)
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
    document.getElementById("item-library").style.display = "grid"
    setTimeout(()=>{
      document.getElementById("item-library").style.opacity = "100%"
    }, 1)
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
