const socket = io.connect();

const imprimir = (data) => {
  const html = data.messages
    .map((element, index) => {
      return `
              <div>
                  <strong>${element.author}</strong>
                  <strong>${element.date}:</strong>
                  <em>${element.text}</em>
              </div>
              `;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;

  const ps = data.products
    .map((p) => {
      return `
      <div class="card " style="width: 15rem;">
        <img src=${p.thumbnail} class="card-img-top w-100 h-100" alt='imagen producto'>
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">$ ${p.price}</p>
        </div>
      </div>
      `;
    })
    .join(" ");
  document.getElementById("divProductos").innerHTML = ps;
};
const limpiar = () => {
  document.getElementById("text").value = " ";
  document.getElementById("title").value = " ";
  document.getElementById("price").value = " ";
  document.getElementById("thumbnail").value = " ";
};
const addMessage = (e) => {
  let text = document.getElementById("text").value;
  let user = document.getElementById("username").value;
  let fecha = new Date().toLocaleDateString() + " " + new Date().toTimeString();
  let fyh = fecha.split(" ");
  const mensaje = {
    author: user,
    text: text,
    date: fyh[0] + " - " + fyh[1],
  };

  if (text === "") {
    alert("escribe un msj");
  } else {
    socket.emit("new-message", mensaje);
    limpiar();
  }
  return false;
};

const addProduct = (e) => {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("new-product", product);
  limpiar();
  return false;
};
socket.on("messages", (data) => {
  imprimir(data);
});
