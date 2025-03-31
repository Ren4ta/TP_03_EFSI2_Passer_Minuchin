let i = localStorage.getItem("i") ? parseInt(localStorage.getItem("i")) : 0;
let listaCompleta = localStorage.getItem("listaCompleta") 
    ? JSON.parse(localStorage.getItem("listaCompleta")) 
    : [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarLista();
    aplicarModoOscuro();
});

function ObtenerItem() {
    let texto = document.getElementById('agregar').value;
    
    if (texto.trim() === "") return;

    listaCompleta.push({
        id: i,
        texto: texto,
        completada: false,
        fecha: new Date().toLocaleDateString()
    });

    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    localStorage.setItem("i", i + 1);
    
    i++;
    document.getElementById('agregar').value = ""; 
    mostrarLista();
}

function eliminarItem(id) {
    listaCompleta = listaCompleta.filter(item => item.id !== id);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function eliminarCompletados() {
    listaCompleta = listaCompleta.filter(item => !item.completada);
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function marcarComoCompletado(id) {
    listaCompleta = listaCompleta.map(item => 
        item.id === id ? { ...item, completada: true } : item
    );
    localStorage.setItem("listaCompleta", JSON.stringify(listaCompleta));
    mostrarLista();
}

function mostrarLista() {
    let listaHTML = document.getElementById("listaTareas");
    listaHTML.innerHTML = "";

    listaCompleta.forEach(item => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = `${item.texto} - ${item.fecha}`;
        span.style.textDecoration = item.completada ? "line-through" : "none";
        
        let btnCompletar = document.createElement("button");
        btnCompletar.textContent = "Completado";
        btnCompletar.onclick = () => marcarComoCompletado(item.id);
        
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Borrar Item";
        btnEliminar.onclick = () => eliminarItem(item.id);
        
        li.appendChild(span);
        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        listaHTML.appendChild(li);
    });
}

function toggleModoOscuro() {
    const body = document.body;
    body.classList.toggle("modo-oscuro");
    const esModoOscuro = body.classList.contains("modo-oscuro");
    localStorage.setItem("modoOscuro", esModoOscuro);
}

function aplicarModoOscuro() {
    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("modo-oscuro");
    }
}
