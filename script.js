let myLib = [];
addBookToLibrary('test1', 'test1', 298, true);
addBookToLibrary('test2', 'test2', 172, false);

var tbodyref = document.getElementsByTagName('tbody')[0];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages,  read) {
    myLib.push(new Book(title, author, pages, read));
}

function renderShelf() {
    tbodyref.innerHTML = "";
    myLib.forEach((item, index) => {
        let newRow = document.createElement("tr");
        newRow.data = index;
        newRow.innerHTML = `<td scope="row">${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.pages}</td>
            <td>${item.read ? "Read" : "Unread"}</td>
            <td><button type="button" class="btn btn-primary" id="readBtn">${item.read ? "Unread" : "Read"}</button></td>
            <td><button type="button" class="btn btn-primary" id="deleteBtn">Delete</button></td>`;
        tbodyref.appendChild(newRow);
    });
}

function insertBook() {
    let title = prompt('Enter Book Title');
    let author = prompt('Enter Book Author');
    let pages = prompt('Enter number of pages in Book');
    let read = prompt('Have you read the book yet? (Y/N)');
    if (read === 'Y' || read === 'yes' || read === 'Yes' || read ==='y') {
        read = true
    } else {
        read = false
    }
    addBookToLibrary(title, author, pages, read);
    renderShelf();
}

function removeBook(bookId) {
    console.log(bookId);
    myLib.splice(bookId, 1);
    renderShelf();
}

function changeReadStatus(index) {
    myLib[index].read = !myLib[index].read;
    console.log(myLib[index]);
    renderShelf();
}

tbodyref.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.id === 'deleteBtn') {
        removeBook(e.target.parentNode.parentNode.data);
    }
    if (e.target.id === 'readBtn') {
        changeReadStatus(e.target.parentNode.parentNode.data);
    }
});

window.onload = renderShelf;
console.log('Hello World!');
