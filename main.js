let precioequipo=0;
let nombreequipo;
let importe=0;
let IGV=0.18;
let subtotal=0;
let total=0;
document.getElementById("Agregar").onclick = function() {
let checkboxes = document.getElementsByName("equipos");
let cliente=prompt("Ingresar Nombre de Cliente");
    for (let checkbox of checkboxes)
    {
        if (checkbox.checked){
        nombreequipo=checkbox.id;
        precioequipo=parseFloat(checkbox.value);
        console.log("Producto Agregado "+checkbox.id+"  S/ "+ checkbox.value);
        importe+=precioequipo;
        } 
    }
    
    calcularIVG(importe)
    if(precioequipo==0){
        alert("Seleccione un produto");
        //console.log("Seleccione un produto");
    }
    function calcularIVG(importe){
        if(importe!=0)
        {
            subtotal=importe;
            IGV=importe*0.18;
            total=importe+IGV;
            console.log("Sub Total: s/ "+subtotal);
            console.log("I.G.V: s/ "+IGV);
            console.log("Total: s/ "+total);
            console.log("-----------------");
            console.log("Cliente: " + cliente);
            console.log("-----------------");
            console.log("Compra Exitosa");
        }
        
    }
}

