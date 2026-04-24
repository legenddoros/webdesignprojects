window.onload = () => {
  const socket = io();

  const form = document.getElementById("form");
  const input = document.getElementById("input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //prompting me to add enod
    const message = input.value;
    input.value = "";
    // emit sends a piece of data
    // first param name of event
    socket.emit("silly note", input.value);
  }); // cool it worked

  input.value = ""; // removes the input text after submit
  socket.on("new message", (msg) => {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = msg;
    document.body.appendChild(newParagraph);
  });
};
