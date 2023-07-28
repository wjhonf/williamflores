let codigoEquipo=0;
let aumentarCantidad=0;
let importe=0;
let IGV=0.18;
let subtotal=0;
let total=0;
let item=0;
const equipos=[
    {id:1, nobreEquipo:"Laptop",precio:1000, imagenEquipo:"./imagenes/laptop.jpg"},
    {id:2, nobreEquipo:"PC",precio:1500, imagenEquipo:"./imagenes/pc.jpg"},
    {id:3, nobreEquipo:"Impresora",precio:700, imagenEquipo:"./imagenes/impresora.jpg"}, 
    {id:4, nobreEquipo:"Monitor",precio:200, imagenEquipo:"./imagenes/monitor.jpg"},

];
function sumarColumna() {
  const tabla = document.getElementById("detalle");
  const filas = tabla.getElementsByTagName("tr");
  let suma = 0;
  for (let i = 0; i < filas.length; i++) {
    const celdas = filas[i].getElementsByTagName("td");
    const valorCelda = parseInt(celdas[5].textContent); 
    console.log(valorCelda);
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
  let fila = boton.parentNode.parentNode;
  let tabla = fila.parentNode; 
  tabla.removeChild(fila);
  sumarColumna()
}
function validarNumeros(event) {
  let cajaTexto = event.target;
  let valor = cajaTexto.value;
  let regex = /^[0-9]+$/;

  if (!regex.test(valor)) {
    cajaTexto.value = valor.replace(/\D/g, '');
  }
}

function buscar(){
    let codigo= codigoEquipo;
    const caractEquipos=[
        {id:1, descripEquipo:"Laptop - Lenovo I3 RAM:8GB Disco:240GB",precio:1000},
        {id:2, descripEquipo:"PC - DELL I7 RAM:16GB Disco:1TB",precio:1500},
        {id:3, descripEquipo:"Impresora - EPSON Multifuncional",precio:1000},
        {id:4, descripEquipo:"Monitor - LG 19 Pulgadas",precio:200},
    ]
    function mostrarCaracteristicas(caracteristicas){
        caracteristicas.forEach( detEquipo => {
            let agregarequipos=document.querySelector(".detalleCaracteristicas");
            agregarequipos.innerHTML+=`<div class="row" id="w"><div class="col-8">
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
              </div>`
            codigoEquipo=0;
        })
        let aumentarCantidad = document.querySelector(".aumentar")
        aumentarCantidad.addEventListener('click', incrementarContador)
        let contador = 0;
        function incrementarContador() {
          contador=document.getElementById("cantidad").value;
          contador++;
            if(contador<=11){
            document.getElementById("cantidad").value = contador;
            }
        }
        let restarCantidad = document.querySelector(".disminuir")
        restarCantidad.addEventListener('click', disminuirContador)
        function disminuirContador() {
          contador=document.getElementById("cantidad").value;
          if (contador > 0) {
            contador--;
            document.getElementById("cantidad").value = contador;
          }
        }     
    }
    function filtrarCaracterisiticas(){
        const resultado = caractEquipos.filter(filtrarId)
        if(resultado.length){
            mostrarCaracteristicas(resultado);
        }else {
            console.log("sin resultado");
        }
    }
    function filtrarId(caractEquipos){
        if(codigo){
            return caractEquipos.id === codigo; 
        }
       return equipo;
    }
    filtrarCaracterisiticas(caractEquipos)
  }
for(let equipo of equipos)
{ 
    let agregarEquipos=document.querySelector(".agregarequipos");
    agregarEquipos.innerHTML+=` 
    <div class="card  mb-1">
    <div class="card-body">
    <span class="badge text-bg-light">${equipo.nobreEquipo}</span><br>
      <img src="${equipo.imagenEquipo}" class="img-thumbnail" alt="Laptop">
      <label for="exampleFormControlInput1" class="form-label">Precio:s/ ${equipo.precio}<br>
      <div class="input-group mb-3 input-group-sm">
      <button type="button" class="btn btn-success comprar" value="${equipo.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar</button>
     </div>
    </div>
  </div>`
}
const btnComprar = document.querySelectorAll(".comprar");
btnComprar.forEach(comprar => {
    comprar.addEventListener("click", () => {
    codigoEquipo=Number(comprar.value);
    buscar(codigoEquipo)
    }
    );
  })
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
  item=1;
  if(numeroFilas>=0)
  { 
    item+=numeroFilas;
    const cuerpoTabla=document.getElementById("detalle");
    const nuevaFila=document.createElement("tr");
    const idEquipo=document.getElementById("codigoEquipo").textContent;
    const descripEquipo=document.getElementById("descipProducto").textContent;
    const precioEquipo=parseFloat(document.getElementById("precioEquipo").textContent);
    const cantidad=Number(document.getElementById("cantidad").value);
    nuevaFila.innerHTML=`
    <td>${item}</td><td style="display: none;><input type="text" class="form-control" id="id" value="${idEquipo}" /td><td>${descripEquipo}</td><td>${precioEquipo}</td><td>${cantidad}</td><td>${precioEquipo*cantidad}</td><td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarFila(this)">x</button></td>`;
    cuerpoTabla.appendChild(nuevaFila);
  }
  limpiar();
  sumarColumna()
}


