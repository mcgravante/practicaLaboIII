var Animales;
(function (Animales) {
    var listaMascotas = new Array();
    var mascotaSeleccionada = false;
    var globalTr;
    function CalcularId() {
        var id = 1;
        if (listaMascotas.length != 0) {
            var lastRegisterIndex = listaMascotas.length - 1;
            var lastRegister = listaMascotas[lastRegisterIndex];
            id = lastRegister.getId() + 1;
        }
        return id;
    }
    window.onload = function () {
        var _a, _b, _c, _d;
        (_a = document.getElementById("btnGuardar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", Animales.Guardar);
        (_b = document.getElementById("btnModificar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", Animales.Modificar);
        (_c = document.getElementById("btnEliminar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", Animales.Eliminar);
        (_d = document.getElementById("textBuscar")) === null || _d === void 0 ? void 0 : _d.addEventListener("keypress", Animales.SwapTables);
    };
    function Guardar() {
        var nombre = document.getElementById("nombre").value;
        var atributo = document.getElementById("atributo").value;
        var p = new Promise(function (resolve, reject) {
            var tipo = document.getElementById("tipo").value;
            if (tipo == "Gato") {
                var vidas = parseInt(atributo);
                if (vidas.toString() != "NaN") {
                    resolve(new Animales.Gato(CalcularId(), nombre, vidas));
                }
                else {
                    reject("EPIC FAIL!!");
                }
            }
            else if (tipo == "Perro") {
                var raza = atributo;
                resolve(new Animales.Perro(CalcularId(), nombre, raza));
            }
            else if (tipo == "Pajaro") {
                if (Object.values(Animales.eTipo).includes(atributo)) {
                    var tipoDePajaro = Animales.eTipo[atributo];
                    resolve(new Animales.Pajaro(CalcularId(), nombre, tipoDePajaro));
                }
                else {
                    reject("EPIC FAIL!!");
                }
            }
            else {
                reject("EPIC FAIL!!");
            }
        });
        p.then(function (mascota) {
            listaMascotas.push(mascota);
            var tablaMascotas = document.getElementById("tablaMascotas");
            ConstruirFila(tablaMascotas, mascota.getId(), nombre, atributo);
        })["catch"](function (error) {
            alert("epic fail" + error);
        });
    }
    Animales.Guardar = Guardar;
    function Modificar() {
        if (mascotaSeleccionada) {
            var idMascota = globalTr.childNodes[2].innerHTML;
            var nombreNuevo = document.getElementById("nombre").value;
            var atributoNuevo = document.getElementById("atributo").value;
            var tipoNuevo = document.getElementById("tipo").value;
            var tablaMascotas = document.getElementById("tablaMascotas");
            tablaMascotas.childNodes.forEach(function (element) {
                if (element.nodeName == "TR") {
                    if (element.childNodes[2].textContent == idMascota) {
                        globalTr = element;
                        return;
                    }
                }
            });
            listaMascotas.forEach(function (mascota) {
                if (mascota.getId() == idMascota) {
                    if (tipoNuevo == "Gato") {
                        var vidas = parseInt(atributoNuevo);
                        if (vidas.toString() != "NaN") {
                            mascota.setCantidadVidas(vidas);
                            globalTr.childNodes[1].innerHTML = atributoNuevo;
                            mascota.setNombre(nombreNuevo);
                            globalTr.childNodes[0].innerHTML = nombreNuevo;
                        }
                        else {
                            alert("debe ser un numero");
                        }
                    }
                    else if (tipoNuevo == "Perro") {
                        var raza = atributoNuevo;
                        mascota.setRaza(raza);
                        globalTr.childNodes[1].innerHTML = atributoNuevo;
                        mascota.setNombre(nombreNuevo);
                        globalTr.childNodes[0].innerHTML = nombreNuevo;
                    }
                    else if (tipoNuevo == "Pajaro") {
                        if (Object.values(Animales.eTipo).includes(atributoNuevo)) {
                            var tipoDePajaro = Animales.eTipo[atributoNuevo];
                            mascota.setTipo(tipoDePajaro);
                            globalTr.childNodes[1].innerHTML = atributoNuevo;
                            mascota.setNombre(nombreNuevo);
                            globalTr.childNodes[0].innerHTML = nombreNuevo;
                        }
                        else {
                            alert("debe ser un tipo válido de pájaro");
                        }
                    }
                    mascotaSeleccionada = false;
                    return;
                }
            });
        }
        else {
            alert("seleccione mascota");
        }
    }
    Animales.Modificar = Modificar;
    function Eliminar() {
    }
    Animales.Eliminar = Eliminar;
    function BuscarMascota() {
        var nombreABuscar = document.getElementById("textBuscar").value;
        return new Promise(function (resolve, reject) {
            var coincidencias = listaMascotas.filter(function (mascota) { return mascota.getNombre().includes(nombreABuscar); });
            resolve(coincidencias);
        });
    }
    Animales.BuscarMascota = BuscarMascota;
    function SwapTables() {
        var tablaMascotas = document.getElementById("tablaMascotas");
        var tablaCoincidencias = document.getElementById("tablaCoincidencias");
        if (document.getElementById("textBuscar").value != "") {
            tablaMascotas.hidden = true;
            tablaCoincidencias.innerHTML = "";
            BuscarMascota().then(function (listaFiltrada) {
                listaFiltrada.forEach(function (mascota) {
                    var atributo = "";
                    if (mascota instanceof Animales.Gato) {
                        atributo = mascota.getCantidadVidas().toString();
                    }
                    if (mascota instanceof Animales.Perro) {
                        atributo = mascota.getRaza();
                    }
                    if (mascota instanceof Animales.Pajaro) {
                        atributo = Animales.eTipo[mascota.getTipo()];
                    }
                    ConstruirFila(tablaCoincidencias, mascota.getId(), mascota.getNombre(), atributo);
                });
            });
            tablaCoincidencias.hidden = false;
        }
        else {
            tablaMascotas.hidden = false;
            tablaCoincidencias.hidden = true;
        }
    }
    Animales.SwapTables = SwapTables;
    function ConstruirFila(tabla, id, nombre, atributo) {
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
        td3.hidden = true;
        tr.addEventListener("dblclick", fillData);
        tabla.appendChild(tr);
    }
    Animales.ConstruirFila = ConstruirFila;
    function fillData(tr) {
        var trForFilling = tr.target.parentNode;
        globalTr = trForFilling;
        mascotaSeleccionada = true,
            document.getElementById("nombre").value = trForFilling.childNodes[0].innerHTML;
        document.getElementById("atributo").value = trForFilling.childNodes[1].innerHTML;
    }
    Animales.fillData = fillData;
})(Animales || (Animales = {}));
