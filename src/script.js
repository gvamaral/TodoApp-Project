// Function for adding Lists
let name = 0
function makingLists() {
    let input = document.querySelector('#listNames');
    let text = input.value
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<input type="radio" name="a0" id="${name}" class="radio" style="display:none">
    <label for="${name}">${input.value}</label>`
    name += 1
}
let toDoLists = {listName:'test', listItems:['first item', 'second item']}
function selectList() {
    let h1Name = document.querySelector('#list-name')
    let divForItems = document.querySelector('#item')
    
}