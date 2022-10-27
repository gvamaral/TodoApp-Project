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
    let input = document.querySelector('#createListName');
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<input type="radio" name="a0" id="ul${listIndex}" onclick="selectList(${listIndex})" class="radio" style="display:none">
    <label for="ul${listIndex}"><p class="listName" id="ln${listIndex}">${input.value}</p><div class="buttons"><button class="trash" title="Delete" onclick="deleteList(${listIndex})"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" onclick="editLists(${listIndex})"><i class="fa-solid fa-pencil"></i></button></div></label>`
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
    <input type="text" id="createListName" placeholder="Enter List Name...">
    <button id="add" title="Add List" onclick="makingLists()">+</button>
    </span>
    <input type="radio" name="a0" id="ul0" onclick="selectList(0)" class="radio" style="display:none" checked>
    <label for="ul0"><p class="listName" id="ln0">${toDoLists[0].listName}</p><div class="buttons"><button class="trash" title="Delete" onclick="deleteList(0)"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" onclick="editLists(0)"><i class="fa-solid fa-pencil"></i></button></div></label>`
    for (let i = 1; i < toDoLists.length; i++) {
        lists.innerHTML += `<input type="radio" name="a0" id="ul${i}" onclick="selectList(${i})" class="radio" style="display:none">
        <label for="ul${i}"><p class="listName" id="ln${i}">${toDoLists[i].listName}</p><div class="buttons"><button class="trash" title="Delete" onclick="deleteList(${i})"><i class="fa-solid fa-trash"></i></button>
        <button class="edit" title="Edit" onclick="editLists(${i})"><i class="fa-solid fa-pencil"></i></button></div></label>`
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
    let divForItems = document.querySelector('.item')
    let features = document.querySelector('.features')
    divForItems.innerHTML = `<div class="task">
    <input type="text" placeholder="Add item..." id="addItems"><button class="btnItem" title="Add Item" id="btnItem" onclick="makingItems(${index})">+</button>
    </div>`
    features.innerHTML = `<h1 id="list-name">${toDoLists[index].listName}</h1><button class="clear" title="Delete checked items" onclick="clearChecked(${index})"><img src="images/trash-x.png" height=25 width=25></img></button>`
    itemID = 0
    for (let i = 0; i < toDoLists[index].listItems.length; i++) {
        if (toDoLists[index].listItems[i].checked) {
            divForItems.innerHTML += `<div class="task" id="div${itemID}"><div class="checkbox"><input id="li${itemID}" onclick="updateChecked(${index}, ${itemID})" type="checkbox" name="something" checked>
            <span id="name${itemID}">${toDoLists[index].listItems[i].name} </span></div>
            <div class="buttons"><button class="trash" title="Delete" id="trash${itemID}" onclick="removeItems(${index}, ${itemID})"><i class="fa-solid fa-trash"></i></button>
            <button class="edit" title="Edit" id="edit${itemID}" onclick="editItems(${index}, ${itemID})"><i class="fa-solid fa-pencil"></i></button></div></div>`
        }
        else {
            divForItems.innerHTML += `<div class="task" id="div${itemID}"><div class="checkbox"><input id="li${itemID}" onclick="updateChecked(${index}, ${itemID})" type="checkbox" name="something">
            <span id="name${itemID}">${toDoLists[index].listItems[i].name} </span></div>
            <div class="buttons"><button class="trash" title="Delete" id="trash${itemID}" onclick="removeItems(${index}, ${itemID})"><i class="fa-solid fa-trash"></i></button>
            <button class="edit" title="Edit" id="edit${itemID}" onclick="editItems(${index}, ${itemID})"><i class="fa-solid fa-pencil"></i></button></div></div>`
        }
        itemID += 1
    }
    let selectedList = document.querySelector(`#ul${index}`);
    selectedList.checked = true
    Enter();
}
// Adding Items
function makingItems(index) {
    let input = document.querySelector('#addItems');
    let divForItems = document.querySelector('.item');
    toDoLists[index].listItems.push({name:input.value, checked:false});
    divForItems.innerHTML += `<div class="task" id="div${itemID}"><div class="checkbox"><input id="li${itemID}" onclick="updateChecked(${index}, ${itemID})" type="checkbox" name="something">
        <span id="name${itemID}">${input.value} </span></div><div class="buttons"><button class="trash" title="Delete" id="trash${itemID}" onclick="removeItems(${index}, ${itemID})"><i class="fa-solid fa-trash"></i></button>
        <button class="edit" title="Edit" id="edit${itemID}" onclick="editItems(${index}, ${itemID})"><i class="fa-solid fa-pencil"></i></button></div></div>`
    itemID += 1
    saveItems();
    Enter();
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
async function removeItems(index, itemIndex) {
    let item = document.querySelector(`#div${itemIndex}`);
    // item.innerHTML = "";
    // item.style.padding = "0";
    // item.style.height = "0";
    item.style.left = "110%";
    toDoLists[index].listItems.splice(itemIndex, 1);
    saveItems();
    await delay(1000);
    selectList(index);
}
// Clear checked items
async function clearChecked(listIndex) {
    for (let i = 0; i < toDoLists[listIndex].listItems.length; i++) {
        if (toDoLists[listIndex].listItems[i].checked == true) {
            removeItems(listIndex, i);
            i = -1;
        }
    }
}
// Editing Item names, opening input to edit
function editItems(index, itemIndex) {
    let item = document.querySelector(`#div${itemIndex}`);
    let itemName = document.querySelector(`#name${itemIndex}`)
    item.innerHTML =`<div class="checkbox"><input id="li${itemIndex}" onclick="updateChecked(${index}, ${itemIndex})" type="checkbox" name="something">
    <span id="name${itemIndex}"><input class="editInput" id="editInput${itemIndex}" type="text" value="${itemName.innerHTML}"></span></div>
    <div class="buttons"><button class="trash" title="Delete" id="trash${itemIndex}" onclick="removeItems(${index}, ${itemIndex})"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" onclick="editted(${index}, ${itemIndex})"><i class="fa-solid fa-check"></i></button>`
}
// After editting
function editted(index, itemIndex) {
    let item = document.querySelector(`#div${itemIndex}`);
    let input = document.querySelector(`#editInput${itemIndex}`).value;
    toDoLists[index].listItems[itemIndex].name = input;
    item.innerHTML = `<div class="checkbox"><input id="li${itemIndex}" onclick="updateChecked(${index}, ${itemIndex})" type="checkbox" name="something">
    <span id="name${itemIndex}">${input} </span></div>
    <div class="buttons"><button class="trash" title="Delete" id="trash${itemIndex}" onclick="removeItems(${index}, ${itemIndex})"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" id="edit${itemIndex}" onclick="editItems(${index}, ${itemIndex})"><i class="fa-solid fa-pencil"></i></button>`
    saveItems();
}
// Editing List names, opening input to edit
function editLists(index) {
    let list = document.querySelector(`[for="ul${index}"]`);
    let listName = document.querySelector(`#ln${index}`);
    list.innerHTML = `<p id="ln${index}" class="listName"><input class="editListInput" id="editListInput${index}" type="text" value="${listName.innerHTML}"></p>
     <div class="buttons"><button class="trash" title="Delete" onclick="deleteList(${index})"><i class="fa-solid fa-trash"></i></button>
     <button class="edit" title="Edit" onclick="listEditted(${index})"><i class="fa-solid fa-check"></i></button></div>`
}
// After editting List
function listEditted(index) {
    let list = document.querySelector(`[for="ul${index}"]`);
    let h1Name = document.querySelector('#list-name')
    let input = document.querySelector(`#editListInput${index}`).value;
    toDoLists[index].listName = input;
    list.innerHTML =`<p id="ln${index}" class="listName">${input}</p>
    <div class="buttons"><button class="trash" title="Delete" onclick="deleteList(${index})"><i class="fa-solid fa-trash"></i></button>
    <button class="edit" title="Edit" onclick="editLists(${index})"><i class="fa-solid fa-pencil"></i></button></div>`
    selectList(index);
    saveItems();
}
// Saving to Local Storage
function saveItems() {
    localStorage.setItem('items', JSON.stringify(toDoLists))
}
// Used to delay time in milliseconds for the transitions in css
function delay(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('1 second');
        }, time);
    });
  }
// Pressing Enter event listeners
function Enter() {
    let makeItemInputBox = document.querySelector('#addItems');
    makeItemInputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btnItem").click();
        }
    });
    let makeListInputBox = document.querySelector('#createListName');
    makeListInputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("add").click();
        }
    });
};
function runWhenPageLoads() {
    displayList(); // Shows lists from Local Storage
    selectList(0); // Shows items from Local Storage for first list when page loads
};

window.onload = runWhenPageLoads;