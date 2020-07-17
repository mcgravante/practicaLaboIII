var Animales;
(function (Animales) {
    var Mascota = /** @class */ (function () {
        function Mascota(id, nombre) {
            this.id = id;
            this.nombre = nombre;
        }
        Mascota.prototype.getNombre = function () {
            return this.nombre;
        };
        Mascota.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Mascota.prototype.getId = function () {
            return this.id;
        };
        Mascota.prototype.setId = function (id) {
            this.id = id;
        };
        return Mascota;
    }());
    Animales.Mascota = Mascota;
})(Animales || (Animales = {}));
