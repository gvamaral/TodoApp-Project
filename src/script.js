// List storage
let toDoLists = [{listName:'test', 
listItems:['first item', 'second item']},
{listName:'frutas',
listItems:['banana', 'morango']}]

let storedLists = JSON.parse(localStorage.getItem('items'));
if (storedLists) {
    toDoLists = storedLists;
}
// Adding Lists
let name = 2
function makingLists() {
    let input = document.querySelector('#listNames');
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<input type="radio" name="a0" id="${name}" onclick="selectList(${name})" class="radio" style="display:none">
    <label for="${name}">${input.value}</label>`
    toDoLists.push({listName:input.value, listItems:[]})
    name += 1
    saveItems();
}
// Displaying Lists
function displayList() {
    name = 0
    let lists = document.querySelector('.lists');
    lists.innerHTML = `<span>
    <input type="text" id="listNames" placeholder="Enter List Name...">
    <button id="add" onclick="makingLists()">+</button>
    </span>`
    for (let i = 0; i < toDoLists.length; i++) {
        lists.innerHTML += `<input type="radio" name="a0" id="${name}" onclick="selectList(${name})" class="radio" style="display:none">
        <label for="${name}">${toDoLists[name].listName}</label>`
        name += 1
    }
}
// Selecting lists on click
function selectList(index) {
    let h1Name = document.querySelector('#list-name')
    let divForItems = document.querySelector('.item')
    divForItems.innerHTML = `<div class="task">
    <input type="text" placeholder="Add item..." id="addItems"><button class="btnItem" id="btnItem" onclick="makingItems(${index})">+</button>
</div>`
    h1Name.innerHTML = toDoLists[index].listName
    itemID = 0
    for (let i = 0; i < toDoLists[index].listItems.length; i++) {
        divForItems.innerHTML += `<div class="task"><input id="li${itemID}" type="checkbox" name="something">
        <span>${toDoLists[index].listItems[i]}</span></div>`
        itemID += 1
    }
}
// Adding Items
let itemID = 0
function makingItems(index) {
    let input = document.querySelector('#addItems');
    let divForItems = document.querySelector('.item');
    toDoLists[index].listItems.push(input.value);
    divForItems.innerHTML += `<div class="task"><input id="li${itemID}" type="checkbox" name="something">
        <span>${input.value}</span></div>`
    itemID += 1
    saveItems();
}
// Saving to Local Storage
function saveItems() {
    localStorage.setItem('items', JSON.stringify(toDoLists))
}


function runWhenPageLoads() {
    displayList(); // Shows lists from Local Storage
    selectList(0); // Shows items from Local Storage for first list when page loads
};

window.onload = runWhenPageLoads;