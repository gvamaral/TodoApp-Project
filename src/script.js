// List storage
let toDoLists = [{listName:'test', 
listItems:['first item', 'second item']},
{listName:'frutas',
listItems:['banana', 'morango']}]

// Adding Lists
let name = 2
function makingLists() {
    let input = document.querySelector('#listNames');
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<input type="radio" name="a0" id="${name}" onclick="selectList(${name})" class="radio" style="display:none">
    <label for="${name}">${input.value}</label>`
    toDoLists.push({listName:input.value})
    name += 1
}
// Selecting lists on click
function selectList(index) {
    let h1Name = document.querySelector('#list-name')
    let divForItems = document.querySelector('.item')
    divForItems.innerHTML = `<div class="task">
    <input type="text" placeholder="Add item..." id="addItems"><button class="btnItem" id="btnItem" onclick="makingItems(${index})">+</button>
</div>`
    h1Name.innerHTML = toDoLists[index].listName
    for (let i = 0; i < toDoLists[index].listItems.length; i++) {
        divForItems.innerHTML += `<div class="task"><input type="checkbox" name="something">
        <span>${toDoLists[index].listItems[i]}</span></div>`
    }
}
// Adding Items
function makingItems(index) {
    let input = document.querySelector('#addItems');
    let divForItems = document.querySelector('.item');
    toDoLists[index].listItems.push(input.value);
    divForItems.innerHTML += `<div class="task"><input type="checkbox" name="something">
        <span>${input.value}</span></div>`

}