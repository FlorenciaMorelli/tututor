<?php
require_once(__DIR__.'/../config/generals.php');

if(estaAutenticado()){
    cerrarSesion();
}