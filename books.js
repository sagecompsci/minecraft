const file = "books.json";


async function getData() {
    const response = await fetch(file);
    const data = await response.json();

    const search = () => {
        let input = searchBar.value;
        input = normalize(input);
        filter(data.books, input);
    }

    search();

    // if (searchBar.value === ''){
    //     displayBooks(data.books);
    // }



}

const filter = (list, input) => {
    let filtered = [];
    list.forEach((item) => {
        if (normalize(item.name).includes(input)){
            filtered.push(item);
        }
    });
    displayBooks(filtered);
}

// const data = getData();
// console.log(data);
// console.log(data.books);

const displayBooks = (books) => {
    const booksList = document.querySelector("#books-list");
    while(booksList.firstChild){
        booksList.firstChild.remove();
    }
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


const searchBar = document.querySelector("#search");
searchBar.value = '';

const normalize = (string) => {
    let stringList = [];
    string.split('').forEach((letter) => {
        let character = ''
        if (letter === " "){
            character = "";
        } else {
            character = letter;
        }
        stringList.push(character.toLowerCase());
    });
    return stringList.join("");
}

getData();
