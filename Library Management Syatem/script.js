let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
    const name = document.getElementById("bookName").value.trim();
    const author = document.getElementById("author").value.trim();

    if (!name || !author) {
        alert("Please fill all fields");
        return;
    }

    books.push({
        id: Date.now(),
        name,
        author,
        issued: false,
        borrower: ""
    });

    saveBooks();
    renderBooks();

    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
}

function renderBooks() {
    const list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach((book, index) => {
        list.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td class="${book.issued ? 'issued' : 'available'}">
                    ${book.issued ? "Issued" : "Available"}
                </td>
                <td>${book.borrower || "-"}</td>
                <td>
                    ${
                        book.issued
                        ? `<button class="action-btn" onclick="returnBook(${book.id})">Return</button>`
                        : `<button class="action-btn" onclick="issueBook(${book.id})">Issue</button>`
                    }
                    <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function issueBook(id) {
    const borrower = prompt("Enter borrower name:");
    if (!borrower) return;

    const book = books.find(b => b.id === id);
    book.issued = true;
    book.borrower = borrower;

    saveBooks();
    renderBooks();
}

function returnBook(id) {
    const book = books.find(b => b.id === id);
    book.issued = false;
    book.borrower = "";

    saveBooks();
    renderBooks();
}

function deleteBook(id) {
    if (!confirm("Delete this book?")) return;
    books = books.filter(book => book.id !== id);
    saveBooks();
    renderBooks();
}

function searchBook() {
    const search = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#bookList tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(search)
            ? ""
            : "none";
    });
}

renderBooks();
