const file = "books.json";

async function getData() {
    const response = await fetch(file);
    const data = await response.json();
    displayBooks(data.books);
}


// const data = getData();
// console.log(data);
// console.log(data.books);

const displayBooks = (books) => {
    const booksList = document.querySelector("#books-list");
    books.forEach((book) => {
        const card = document.createElement("section");
        card.classList.add("book-card");

        const name = document.createElement("h3");
        const level = document.createElement("p");
        const emerald = document.createElement("p");


        name.textContent = `${book.name}`;

        let roman = "Ⅰ";
        let cost = 5;
        if (book.level === 2){
            roman = "Ⅱ";
            cost = 8;
        } else if (book.level === 3){
            roman = "Ⅲ";
            cost = 11;
        } else if (book.level === 4){
            roman = "Ⅳ";
            cost = 14;
        } else if (book.level === 5){
            roman = "Ⅴ";
            cost = 17;
        }

        if (book.treasure === true){
            cost = cost*2;
        }

        if (book.name === "Swift Sneak" || book.name === "Soul Speed" || book.name === "Wind Burst"){
            cost = 'NA';
        }

        level.textContent = `Highest Level: ${roman}`;
        emerald.textContent = `Lowest Cost: ${cost}`;

        card.appendChild(name);
        card.appendChild(level);
        card.appendChild(emerald);

        booksList.appendChild(card);
    });

}

getData(displayBooks);

// displayBooks(data);

const searchBar = document.querySelector("#search");
searchBar.value = '';

const search = () => {
    let input = searchBar.value.toLowerCase();
    // let stringList = [];
    // input.split('').forEach((letter) => {
    //     let character = ''
    //     if (letter === " "){
    //         character = "";
    //     } else {
    //         character = letter;
    //     }
    //     stringList.push(character);
    // });
    // input = stringList.join("");
    input = normalize(input);
    console.log(input);
    // filter(data.books, input);
}

const normalize = (string) => {
    let stringList = [];
    string.split('').forEach((letter) => {
        let character = ''
        if (letter === " "){
            character = "";
        } else {
            character = letter;
        }
        stringList.push(character);
    });
    return stringList.join("");
}

const filter = (list, input) => {
    let filtered = [];
    list.forEach((item) => {
        if (normalize(item).includes(input)){
            filtered.push(item);
        }
    });

    displayBooks(filtered);
}