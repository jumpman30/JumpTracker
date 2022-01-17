let links = [];
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const list = document.getElementById("ul-el")
const links_aux = JSON.parse(localStorage.getItem("links"))

//add a button to save al the tabs you have open


tabBtn.addEventListener("click", function(event){
       
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url);
        renderList(links);
       localStorage.setItem("links", JSON.stringify(links));
    })

       
})

const getListElement = () => {
    return document.createElement('li');
}

const geturlElement = () => {
    return document.createElement('a');
}

const getDeleteBtn = () => {
    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.addEventListener("click", function(){
       remove(links.indexOf(btn.parentNode.children[0].textContent))
    })
    return btn;
}


const renderList = (arr) => {

    list.innerHTML = "";

    for (let i = 0; i < links.length; i++) {
        
        let url = geturlElement();
        url.href = links[i];
        url.innerHTML = links[i];
        url.target = '_blank';
        let listEl = getListElement();
        let btn = getDeleteBtn();
        listEl.append(url, " ", btn);
        list.append(listEl);
    }

}

if(links_aux){

   links = links_aux;
   renderList(links);
    
}


inputBtn.addEventListener("click", function() {
    links.push(inputEl.value);
    renderList(links);
   inputEl.value = "";
   localStorage.setItem("links", JSON.stringify(links));

})

deleteBtn.addEventListener("dblclick", function(){
    links = [] //empty the array
    renderList(links)
    localStorage.clear();
})

const remove = (index) => {
    list.removeChild(list.children[index]);
    links.splice(index,1);
    localStorage.setItem("links", JSON.stringify(links));
}

inputEl.addEventListener("keyup", function (event){
    event.preventDefault();
    if(event.keyCode === 13 )
            inputBtn.click();
})





/*

et links = [];
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteLink = document.getElementById("delete-btn")

let links_aux = JSON.parse(localStorage.getItem("links"))


const renderList = (arr) => {

    let listItems = "";

    for (let i = 0; i < links.length; i++) {

        listItems += `
        <li>
            <a href= '${arr[i]}' target='_blank'>
                 ${arr[i]} 
            </a>
        </li>`
    }

    ulEl.innerHTML = listItems;
}


if(links_aux){

links = links_aux;
renderList(links);

}

inputBtn.addEventListener("click", function() {
    links.push(inputEl.value);
    renderList(links);
   inputEl.value = "";
   localStorage.setItem("links", JSON.stringify(links));

})





*/