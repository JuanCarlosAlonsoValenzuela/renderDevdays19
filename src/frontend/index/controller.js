/*!
governify-render 1.0.0, built on: 2018-05-09
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-render#readme

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


$scope.date = new Date().toISOString();
$scope.cesta = {};
$scope.total = 0;
$scope.presupuesto = 100.0;

const generosDisponibles = ["Acción", "Aventura", "Drama", "Cyberpunk", "Ciencia Ficción", "Western"]

$scope.addMovie = function(pelicula){
    $scope.total = 0;
    if(!$scope.cesta[pelicula.titulo]){
        $scope.cesta[pelicula.titulo] = pelicula;
        $scope.cesta[pelicula.titulo].cantidad = 0;
    }
    $scope.cesta[pelicula.titulo].cantidad += 1;
    this.model.peliculas[pelicula.titulo].unidades--;
    calcularTotal();
}

$scope.eliminarPelicula = function(pelicula) {
    delete this.model.peliculas[pelicula.titulo];
}

$scope.vaciarCesta = function(){
    let model2 = this.model;
    Object.keys($scope.cesta).forEach(function(key){
        // Añadir el stock
        model2.peliculas[key].unidades += $scope.cesta[key].cantidad;
    })
    $scope.cesta = {};
    $scope.total = 0;
}

$scope.borrarDeCesta = function(compra){
    this.model.peliculas[compra.titulo].unidades += $scope.cesta[compra.titulo].cantidad
    delete $scope.cesta[compra.titulo]; 
    calcularTotal();
}

$scope.pagar = function(){
    if($scope.presupuesto >= $scope.total){
        $scope.presupuesto = $scope.presupuesto - $scope.total;
        $scope.cesta = {};
        $scope.total = 0;
    }else{
        alert("El presupuesto es insuficiente para realizar el pago");
    }
}

$scope.crearPelicula = function(){
    
    if(this.Generos == null || this.Generos.length == 0){
        alert("Por favor, introduzca al menos un género");
    }else if($scope.FechaEstreno > new Date()){
        alert("La fecha de estreno debe ser anterior a la actual");
    }else{

        let listaGeneros = [];
        let auxList = this.Generos;
        Object.keys(this.Generos).forEach(function(key){
            if(auxList[key]){
                listaGeneros.push(generosDisponibles[key]);
            }
        })

        let nuevaPelicula = {
            "titulo": $scope.Titulo,
            "sinopsis": $scope.Sinopsis,
            "fechaEstreno": $scope.FechaEstreno,
            "precio": $scope.Precio,
            "unidades": $scope.Unidades,
            "imagen": $scope.Imagen,
            "generos": listaGeneros
        }
        this.model.peliculas[$scope.Titulo] = nuevaPelicula;
        alert("Película creada con éxito");
    }
    
}


$scope.incrementar = function(pelicula){
    this.model.peliculas[pelicula.titulo].unidades++;
}

$scope.decrementar = function(pelicula){
    this.model.peliculas[pelicula.titulo].unidades--;
}

function calcularTotal(){
    $scope.total = 0;
    Object.keys($scope.cesta).forEach(function(key){
        var pelicula = $scope.cesta[key]
        $scope.total = $scope.total + (pelicula.precio * pelicula.cantidad)
    })
}

