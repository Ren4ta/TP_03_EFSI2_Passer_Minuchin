let i = localStorage.getItem("i") ? parseInt(localStorage.getItem("i")) : 0;
let listaCompleta = localStorage.getItem("listaCompleta") 
    ? JSON.parse(localStorage.getItem("listaCompleta")) 
    : [];

document.addEventListener("DOMContentLoaded", mostrarLista);

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
        li.innerHTML = `
            ${item.texto} - ${item.fecha} 
            <button onclick="marcarComoCompletado(${item.id})">Completado</button>
            <button onclick="eliminarItem(${item.id})">Borrar Item</button>
        `;
        li.style.textDecoration = item.completada ? "line-through" : "none";
        listaHTML.appendChild(li);
    });
}
