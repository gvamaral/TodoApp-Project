function makingLists() {
    let input = document.querySelector('#listNames');
    let text = input.value
    let lists = document.querySelector('.lists');
    lists.innerHTML += `<div>${text}</div>`
}