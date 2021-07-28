let googleUser;

window.onload = (event) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.displayName);
            googleUser = user;
            getNotes(user.uid)
        }
        else
            window.location = "index.html";
    });
}

function getNotes(userId) {
    const notesRef = firebase.database().ref(`users/${userId}`)
    notesRef.on('value', (db) => {
        const data = db.val()
        console.log(data)
        renderData(data)
    });
}

function renderData(data) {
    console.log(data);
    // var html = ""

    for (const dataKey in data) {
        const note = data[dataKey]
        // console.log(note)
        // html += renderCard(note)
        // document.querySelector("#app").innerHTML = html;

        document.querySelector("#app").appendChild(dynamicRender(note));       
        console.log(document.querySelector("#app").innerHTML)
    }
    

}

function renderCard(note) {
    console.log(note)

    return `
        <div class = "column is-one-half">
            <div class = "card">
                <header class = "card-header">
                    <span class = "card-header-title"> ${note.title} </span>
                </header>
                <div class = "card-content">
                    <div class = "content"> ${ note.text } </div>
                </div>    
            </div>
        </div>
    `;
}

const dynamicRender = (note) => {
    const upperDiv = document.createElement('div')
    upperDiv.classList.add('column', 'is-one-quarter')
    // upperDiv.style = (`color: rgb(${randomColor()})`)

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.style = (`color: rgb(${randomColor()}); background-color: rgb(${randomColor()})`)


    const headerDiv = document.createElement('header')
    headerDiv.classList.add('card-header')

    const span = document.createElement("span")
    span.classList.add("card-header-title")
    span.innerText = note.title + ": " + googleUser.displayName

    const cardContentDiv = document.createElement("div")
    cardContentDiv.classList.add("card-content")

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("content")
    contentDiv.innerText = note.text

    headerDiv.appendChild(span);
    cardContentDiv.appendChild(contentDiv);

    cardDiv.appendChild(headerDiv)
    cardDiv.appendChild(cardContentDiv)

    upperDiv.appendChild(cardDiv)

    console.log(upperDiv)
    return upperDiv;
}

function randomColor() {
    var r = Math.random() * 255
    var g = Math.random() * 255
    var b = Math.random() * 255

    return r + "," + g + "," + b
}