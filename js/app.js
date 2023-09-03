let codigoEquipo=0;
let aumentarCantidad=0;
let carrito=[];
let IGV=0.18;
let total=0;
let item;
document.addEventListener('DOMContentLoaded', ()=>{
   cargarEquipoJSON()
  if(JSON.parse(localStorage.getItem('carrito')) == null){
    carrito = [];
  }else {
    carrito = JSON.parse(localStorage.getItem('carrito'));
  }
  cargarCarritoEnDOM();
})
function cargarCarritoEnDOM() {
  const cuerpoTabla = document.getElementById("detalle");
  const numeroFilas=cuerpoTabla.rows.length;
  item=1;
  carrito.forEach(Equip => {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
    <td>${item}</td><td style="display: none;">${Equip.codigoEquipo}</td>
      <td>${Equip.descripcion}</td>
      <td>${Equip.precio}</td>
      <td>${Equip.cantidad}</td>
      <td>${Equip.importe}</td>
      <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarFila(this)">x</button></td>
    `;
    cuerpoTabla.appendChild(nuevaFila);
    item++;
  });
  sumarColumna();
}
function cargarEquipoJSON() {
    fetch('./data/equipos.json') 
      .then(repuesta => {
        return repuesta.json();
      })
      .then(listaEquipos => {
        equipos = listaEquipos;
        for(let equipo of equipos)
        { 
            let agregarEquipos=document.querySelector(".agregarequipos");
            agregarEquipos.innerHTML+=` 
            <div class="card  mb-1">
            <div class="card-body">
            <span class="badge text-bg-light">${equipo.nobreEquipo}</span><br>
              <img src="${equipo.imagenEquipo}" class="img-thumbnail" alt="Laptop">
              <label  class="form-label">Precio:s/ ${equipo.precio}<br>
              <div class="input-group mb-3 input-group-sm">
              <button type="button" class="btn btn-success comprar" value="${equipo.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar</button>
            </div>
            </div>
          </div>`
        }
        asignarEventosCompra()
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de Equipos.',
        });
      });
  }
function sumarColumna() {
  const tabla = document.getElementById("detalle");
  const filas = tabla.getElementsByTagName("tr");
  let suma = 0;
  for (let i = 0; i < filas.length; i++) {
      const celdas = filas[i].getElementsByTagName("td");
      const valorCelda = parseInt(celdas[5].textContent); 
      if (!isNaN(valorCelda)) {
        suma += valorCelda;
      }
  }
  document.getElementById("subTotal").innerHTML="Importe: S/ "+suma;
  IGV=suma*0.18
  total=suma+IGV
  document.getElementById("IGV").innerHTML="IGV: S/ "+IGV;
  document.getElementById("Total").innerHTML="Total: S/ "+total;
}
function eliminarFila(boton) {
  let fila = boton.closest("tr"); 
  let tabla = fila.parentNode; 
  const codigoEquipo = parseInt(fila.querySelector("td:nth-child(2)").textContent.trim());
  carrito = carrito.filter(item => item.codigoEquipo !== codigoEquipo);
  tabla.removeChild(fila);
  sumarColumna();
  actualizarLocalStorage();
  reenumerarItems();
}
function reenumerarItems() {
  const cuerpoTabla = document.getElementById("detalle");
  const filas = cuerpoTabla.getElementsByTagName("tr");
  item = 0;
  for (let i = 0; i < filas.length; i++) {
    const celdas = filas[i].getElementsByTagName("td");
    celdas[0].textContent = ++item; 
  }
}
function validarNumeros(event) {
  let cajaTexto = event.target;
  let valor = cajaTexto.value;
  let regex = /^[0-9]+$/;
  if (!regex.test(valor)) {
    cajaTexto.value = valor.replace(/\D/g, '');
  }
}
function buscar() {
    let codigo = codigoEquipo;
    const caractEquipos = './data/caracEquipos.json'; 
    fetch(caractEquipos)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        const equipoEncontrado = datos.find(equipo => equipo.id === codigo);
        if (equipoEncontrado) {
          mostrarCaracteristicas([equipoEncontrado]);
        }
      })
      .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar información de equipo seleccionado.',
          });
      });
  }
function mostrarCaracteristicas(caracteristicas) {
    caracteristicas.forEach(detEquipo => {
      let agregarequipos = document.querySelector(".detalleCaracteristicas");
      agregarequipos.innerHTML = `<div class="row" id="w"><div class="col-8">
        <span style="display: none;" id="codigoEquipo">${detEquipo.id}</span>
        <span class="badge text-bg-info">Descripción Equipo:</span> <span class="badge text-bg-light descipProducto" id="descipProducto">${detEquipo.descripEquipo}</span><br>
        <span class="badge text-bg-info">Precio: s/</span>
        <span class="badge text-bg-light precioProducto" id="precioEquipo"> ${detEquipo.precio}</span>
      </div>
      <div class="col-4">
      <label for="exampleFormControlInput1" class="form-label">Ingresar Cantidad</label>
        <div class="input-group">
          <button class="btn btn-outline-warning disminuir" type="button">-</button>
          <input type="text" class="form-control" id="cantidad" value="1" oninput="validarNumeros(event)" style="text-align: center;">
          <button class="btn btn-outline-success aumentar" type="button">+</button>
        </div>
      </div>
        </div>`;
      codigoEquipo = 0;
    });
  
    let aumentarCantidad = document.querySelector(".aumentar")
    aumentarCantidad.addEventListener('click', incrementarContador)
    let contador = 0;
  
    function incrementarContador() {
      contador = document.getElementById("cantidad").value;
      contador++;
      if (contador <= 11) {
        document.getElementById("cantidad").value = contador;
      }
    }
  
    let restarCantidad = document.querySelector(".disminuir")
    restarCantidad.addEventListener('click', disminuirContador)
  
    function disminuirContador() {
      contador = document.getElementById("cantidad").value;
      if (contador > 0) {
        contador--;
        document.getElementById("cantidad").value = contador;
      }
    }
  }
function asignarEventosCompra() {
    const btnComprar = document.querySelectorAll(".comprar");
    btnComprar.forEach(comprar => {
      comprar.addEventListener("click", () => {
        codigoEquipo = Number(comprar.value);
        buscar(codigoEquipo);
      });
    });
  }
let Cerrarmodal = document.querySelector(".cerrarModal")
Cerrarmodal.addEventListener('click', limpiar)
let Cancelar = document.querySelector(".Cancelar")
Cancelar.addEventListener('click', limpiar)
function limpiar() {
  let padre = document.getElementById("Equipos");
  let hijoAEliminar = document.getElementById("w");
  padre.removeChild(hijoAEliminar);
  }
let agregarDetalle = document.querySelector(".addDetalle");
agregarDetalle.addEventListener('click', AgregarDetalle)
function AgregarDetalle(){
  const tabla=document.getElementById("detalle")
  const numeroFilas=tabla.rows.length;

  if(numeroFilas>=0)
  { 
    const idEquipo=document.getElementById("codigoEquipo").textContent;
    const equipoExistente = carrito.find(item => item.codigoEquipo === parseInt(idEquipo));
    item=numeroFilas;
    if (!equipoExistente) {
     
      const cuerpoTabla=document.getElementById("detalle");
      const nuevaFila=document.createElement("tr");
      const descripEquipo=document.getElementById("descipProducto").textContent;
      const precioEquipo=parseFloat(document.getElementById("precioEquipo").textContent);
      const cantidad=Number(document.getElementById("cantidad").value);
      const importe = precioEquipo * cantidad;
      carrito.push({
              codigoEquipo: parseInt(idEquipo),
              descripcion: descripEquipo,
              precio: precioEquipo,
              cantidad: cantidad,
              importe: importe
      });
      item++;
      nuevaFila.innerHTML=`
      <td>${item}</td><td style="display: none;">${idEquipo}</td><td>${descripEquipo}</td><td>${precioEquipo}</td><td>${cantidad}</td><td>${precioEquipo*cantidad}</td><td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarFila(this)">x</button></td>`;
      cuerpoTabla.appendChild(nuevaFila);
      actualizarLocalStorage();
     

    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Equipo Selecionado ya esta agregado.',
          });
    }
  }
  limpiar();
  sumarColumna();
}
function actualizarLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
let eliminarTodo = document.querySelector(".eliminartodo")
eliminarTodo.addEventListener('click', vaciarCarritoCompleto)
function vaciarCarritoCompleto() {
  carrito = [];
  actualizarLocalStorage();
  const cuerpoTabla = document.getElementById("detalle");
  cuerpoTabla.innerHTML = "";
  sumarColumna();
}
