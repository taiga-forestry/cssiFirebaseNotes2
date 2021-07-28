let googleUser;
var labels = [];

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    labels: labels,
    text: noteText.value
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
  });
}



const updateLabel = () => {
    console.log("UPDATE IS LABELLING")
    const span = document.createElement("span")
    span.classList.add("tag");
    span.innerText = document.querySelector("#noteLabel").value
    labels.push(span.innerText)
    console.log(labels)
    document.querySelector("#labels").appendChild(span)
    document.querySelector("#noteLabel").value = ""
}