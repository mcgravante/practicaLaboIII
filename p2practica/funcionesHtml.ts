namespace Animales
{
    var listaMascotas: Array<Mascota> = new Array <Mascota>();

    function CalcularId()
    {
        var id : number = 1;
        if(listaMascotas.length != 0)
        {
            var lastRegisterIndex : number = listaMascotas.length-1;
            var lastRegister : Mascota = listaMascotas[lastRegisterIndex];
            id = lastRegister.getId() + 1;
        }
        return id;
    }

    window.onload = function ()
    {
        document.getElementById("btnGuardar")?.addEventListener("click",Animales.Guardar);
        document.getElementById("btnModificar")?.addEventListener("click",Animales.Modificar);
        document.getElementById("btnEliminar")?.addEventListener("click",Animales.Eliminar);
        document.getElementById("textBuscar")?.addEventListener("keypress",Animales.SwapTables);


    }
    
    export function Guardar()
    {

        var nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        var atributo = (<HTMLInputElement>document.getElementById("atributo")).value;
        
        var p = new Promise((resolve, reject) => {
            var tipo = (<HTMLSelectElement>document.getElementById("tipo")).value;
            if (tipo == "Gato")
            {
                var vidas = parseInt(atributo);
                if (vidas.toString() != "NaN")
                {
                resolve(new Gato(CalcularId(),nombre, vidas))
                }
                else{
                    reject("EPIC FAIL!!")
                }
            }
            else if (tipo == "Perro")
            {
                var raza = atributo;
                resolve (new Perro(CalcularId(),nombre, raza))
            }
            else if (tipo == "Pajaro")
            {
                if ((<any>Object).values(eTipo).includes(atributo)) {
                    var tipoDePajaro : eTipo = (<any>eTipo)[atributo];
                    resolve (new Pajaro(CalcularId(),nombre, tipoDePajaro))
                }
                else {
                    reject("EPIC FAIL!!")
                }
            }
            else {
                reject("EPIC FAIL!!")
            }
        });

        p.then((mascota) => {
            listaMascotas.push(<Mascota>mascota);
            var tablaMascotas = (<HTMLTableElement>document.getElementById("tablaMascotas")); 
            ConstruirFila(tablaMascotas, (<Mascota>mascota).getId(), nombre, atributo);
                }).catch((error)=>
        {
            alert("epic fail" + error)
        })
    }

    export function Modificar ()
    {
        var tablaCoincidencias = (<HTMLTableElement>document.getElementById("tablaCoincidencias")); 
 
        }
    

    export function Eliminar()
    {
    }

    export function BuscarMascota()
    {        
        var nombreABuscar:string = (<HTMLInputElement>document.getElementById("textBuscar")).value;
        return new Promise((resolve, reject) => {
                    var coincidencias = listaMascotas.filter(mascota=>mascota.getNombre().includes(nombreABuscar));
                    resolve(coincidencias);
                });
    }

    export function SwapTables()
    {
        var tablaMascotas = (<HTMLTableElement>document.getElementById("tablaMascotas"));
        var tablaCoincidencias = (<HTMLTableElement>document.getElementById("tablaCoincidencias"));
        if((<HTMLInputElement>document.getElementById("textBuscar")).value != "")
        {
            tablaMascotas.hidden=true;
            tablaCoincidencias.innerHTML="";
            BuscarMascota().then((listaFiltrada) => {
                (<Array<Mascota>>listaFiltrada).forEach(mascota => {
                    var atributo : string = "";
                    if (mascota instanceof Gato)
                    {
                        atributo = (<Gato>mascota).getCantidadVidas().toString();
                    }
                    if (mascota instanceof Perro)
                    {
                        atributo = (<Perro>mascota).getRaza();
                    }
                    if (mascota instanceof Pajaro)
                    {
                        atributo = eTipo[(<Pajaro>mascota).getTipo()];
                    }
                    ConstruirFila(tablaCoincidencias, (<Mascota>mascota).getId(), (<Mascota>mascota).getNombre(), atributo);

                });    
            });
            tablaCoincidencias.hidden=false;
        }
        else{
            tablaMascotas.hidden=false;
            tablaCoincidencias.hidden=true;
        }
    }

    export function ConstruirFila(tabla:HTMLTableElement, id:number, nombre:string, atributo:string):void{
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(nombre));
        tr.appendChild(td);
        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(atributo));
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode((id.toString())));
        tr.appendChild(td3);
        td3.hidden=true;
        //tr.addEventListener("dblclick", AbrirRcuadro);
        tabla.appendChild(tr); 
    }   



}