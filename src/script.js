// List storage
let toDoLists = [
    {
        listName:'test',
        listItems:[
            {
            name:'first item',
            checked: true
            },
            {
            name:'second item',
            checked: false
            }
        ]
    },
    {
        listName:'frutas',
        listItems:[
            {
                name:'banana',
                checked: false
            },
            {
                name:'morango',
                checked: false
            }
        ]
    }
]

let storedLists = JSON.parse(localStorage.getItem('items'));
if (storedLists) {
    toDoLists = storedLists;
}
// Adding Lists
let listIndex = 2
function makingLists() {
    let input = document.querySelector('#listNames');
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<input type="radio" name="a0" id="ul${listIndex}" onclick="selectList(${listIndex})" class="radio" style="display:none">
    <label for="ul${listIndex}">${input.value} <button class="trash" title="Delete" onclick="deleteList(${listIndex})"><i class="fa-solid fa-trash"></i></button></label>`
    toDoLists.push({listName:input.value, listItems:[]})
    saveItems();
    selectList(listIndex);
    listIndex += 1
}
// Displaying Lists
function displayList() {
    listIndex = 1;
    let lists = document.querySelector('.lists');
    lists.innerHTML = `<span>
    <input type="text" id="listNames" placeholder="Enter List Name...">
    <button id="add" title="Add List" onclick="makingLists()">+</button>
    </span>
    <input type="radio" name="a0" id="ul0" onclick="selectList(0)" class="radio" style="display:none" checked>
    <label for="ul0">${toDoLists[0].listName} <button class="trash" title="Delete" onclick="deleteList(0)"><i class="fa-solid fa-trash"></i></button></label>`
    for (let i = 1; i < toDoLists.length; i++) {
        lists.innerHTML += `<input type="radio" name="a0" id="ul${i}" onclick="selectList(${i})" class="radio" style="display:none">
        <label for="ul${i}">${toDoLists[i].listName} <button class="trash" title="Delete" onclick="deleteList(${i})"><i class="fa-solid fa-trash"></i></button></label>`
        listIndex++
    }
}
// Deleting Lists
function deleteList(listIndex) {
    toDoLists.splice(listIndex, 1);
    displayList();
    saveItems();
    selectList(0);
}
// Selecting lists on click
let itemID = 0
function selectList(index) {
    let h1Name = document.querySelector('#list-name')
    let divForItems = document.querySelector('.item')
    let features = document.querySelector('.features')
    divForItems.innerHTML = `<div class="task">
    <input type="text" placeholder="Add item..." id="addItems"><button class="btnItem" title="Add Item" id="btnItem" onclick="makingItems(${index})">+</button>
    </div>`
    features.innerHTML = `<h1 id="list-name">${toDoLists[index].listName}</h1><button class="clear" title="Delete checked items" onclick="clearChecked(${index})"><img src="images/trash-x.png" height=25 width=25></img></button>`
    itemID = 0
    for (let i = 0; i < toDoLists[index].listItems.length; i++) {
        if (toDoLists[index].listItems[i].checked) {
            divForItems.innerHTML += `<div class="task" id="div${itemID}"><input id="li${itemID}" onclick="updateChecked(${index}, ${itemID})" type="checkbox" name="something" checked>
            <span id="name${itemID}">${toDoLists[index].listItems[i].name} </span>
            <button class="trash" title="Delete" onclick="removeItems(${index}, ${itemID})"><i class="fa-solid fa-trash"></i></button>
            <button class="edit" title="Edit" onclick="editItems(${index}, ${itemID})"><i class="fa-solid fa-pencil"></i></button></div>`
        }
        else {
            divForItems.innerHTML += `<div class="task" id="div${itemID}"><input id="li${itemID}" onclick="updateChecked(${index}, ${itemID})" type="checkbox" name="something">
            <span id="name${itemID}">${toDoLists[index].listItems[i].name} </span>
            <button class="trash" title="Delete" onclick="removeItems(${index}, ${itemID})"><i class="fa-solid fa-trash"></i></button>
            <button class="edit" title="Edit" onclick="editItems(${index}, ${itemID})"><i class="fa-solid fa-pencil"></i></button></div>`
        }
        itemID += 1
    }
    let selectedList = document.querySelector(`#ul${index}`);
    selectedList.checked = true
}
// Adding Items
function makingItems(index) {
    let input = document.querySelector('#addItems');
    let divForItems = document.querySelector('.item');
    toDoLists[index].listItems.push({name:input.value, checked:false});
    divForItems.innerHTML += `<div class="task" id="div${itemID}"><input id="li${itemID}" onclick="updateChecked(${index}, ${itemID})" type="checkbox" name="something">
        <span id="name${itemID}">${input.value} </span><button class="trash" title="Delete" onclick="removeItems(${index}, ${itemID})"><i class="fa-solid fa-trash"></i></button>
        <button class="edit" title="Edit" onclick="editItems(${index}, ${itemID})"><i class="fa-solid fa-pencil"></i></button></div>`
    itemID += 1
    saveItems();
}
// Changing check or not checked
function updateChecked(index, itemIndex) {
    let checkbox =  document.querySelector(`#li${itemIndex}`)
    toDoLists[index].listItems[itemIndex].checked = checkbox.checked;
    // fixing error(bug) of checkbox stopping to show checked after adding an item
    checkbox.defaultChecked = toDoLists[index].listItems[itemIndex].checked;
    saveItems();
}
// Removing Items
function removeItems(index, itemIndex) {
    toDoLists[index].listItems.splice(itemIndex, 1);
    saveItems();
    selectList(index);
}
// Clear checked items
function clearChecked(listIndex) {
    for (let i = 0; i < toDoLists[listIndex].listItems.length; i++) {
        if (toDoLists[listIndex].listItems[i].checked == true) {
            removeItems(listIndex, i);
            i = -1;
        }
    }
    // toDoLists[listIndex].listItems.forEach(element => {
    //     if (element.checked == true) {
    //         removeItems(listIndex, toDoLists[listIndex].listItems.indexOf(element));
    //     }
    // });
}
// Editing Item names, opening input to edit
function editItems(index, itemIndex) {
    let item = document.querySelector(`#div${itemIndex}`);
    let itemName = document.querySelector(`#name${itemIndex}`)
    item.innerHTML =`<input id="li${itemIndex}" onclick="updateChecked(${index}, ${itemIndex})" type="checkbox" name="something">
    <span id="name${itemIndex}"><input id="editInput${itemIndex}" type="text" value="${itemName.innerHTML}"></span>
    <button class="trash" title="Delete" onclick="removeItems(${index}, ${itemIndex})"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" onclick="editted(${index}, ${itemIndex})"><i class="fa-solid fa-check"></i></button>`
}
// After editting
function editted(index, itemIndex) {
    let item = document.querySelector(`#div${itemIndex}`);
    let input = document.querySelector(`#editInput${itemIndex}`).value;
    toDoLists[index].listItems[itemIndex].name = input;
    item.innerHTML = `<input id="li${itemIndex}" onclick="updateChecked(${index}, ${itemIndex})" type="checkbox" name="something">
    <span id="name${itemIndex}">${input} </span>
    <button class="trash" title="Delete" onclick="removeItems(${index}, ${itemIndex})"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" onclick="editItems(${index}, ${itemIndex})"><i class="fa-solid fa-pencil"></i></button>`
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