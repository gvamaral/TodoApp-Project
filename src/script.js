// Function for adding Lists
let name = 2
function makingLists() {
    let input = document.querySelector('#listNames');
    let text = input.value
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<input type="radio" name="a0" id="${name}" onclick="selectList(${name})" class="radio" style="display:none">
    <label for="${name}">${input.value}</label>`
    toDoLists.push({listName:input.value})
    name += 1
}

let toDoLists = [{listName:'test', 
                listItems:['first item', 'second item']},
            {listName:'frutas',
            listItems:['banana', 'morango']}]
function selectList(index) {
    let h1Name = document.querySelector('#list-name')
    let divForItems = document.querySelector('.item')
    divForItems.innerHTML = ''
    h1Name.innerHTML = toDoLists[index].listName
    for (let i = 0; i < toDoLists[index].listItems.length; i++) {
        divForItems.innerHTML += `<div class="task"><input type="checkbox" name="something"><span>${toDoLists[index].listItems[i]}</span></div>`
    }
}
