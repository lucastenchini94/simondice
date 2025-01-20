let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;


document.querySelector("button").onclick = function () {
    reiniciarEstado();
    manejarRonda();


}
function reiniciarEstado() {
    let secuenciaMaquina=[];
    let secuenciaUsuario=[];
    let ronda = 0;
}

function manejarRonda() {
    actualziarEstado("turno de la maquina");
    bloquearInputUsuario();

    $nuevoCuadro = cuadroAleatorio();
    secuenciaMaquina.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length+1)*1000;

    secuenciaMaquina.forEach(function($cuadro, index){
        const RETRASO_MS = (index+1)*1000;
        setTimeout(function() {
         resaltar($cuadro);   
        }, RETRASO_MS);
    })
    setTimeout(function() {
        actualziarEstado("turno del jugador");
        desbloquearInputUsuario();

    }, RETRASO_TURNO_JUGADOR);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);



}
function actualziarEstado(estado) {
    const $estado = document.querySelector("#estado");
    $estado.textContent = estado;
    

}
function manejarInputUsuario(e) {
const $cuadro = e.target;
resaltar($cuadro);
secuenciaUsuario.push($cuadro);

const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
 if ($cuadro.id !== $cuadroMaquina.id) {
  perder();
  return;
 }

 if (secuenciaUsuario.length === secuenciaMaquina.length) {
  bloquearInputUsuario();
  setTimeout(manejarRonda, 1000);
 }
}
function actualizarNumeroRonda(ronda) {
document.querySelector('#ronda').textContent = ronda;
}

function cuadroAleatorio() {
    const $cuadro = document.querySelectorAll(".cuadro");
    const indice = Math.floor(Math.random()*$cuadro.length);
    return $cuadro[indice];
}
function bloquearInputUsuario() {
document.querySelectorAll('.cuadro').forEach(function($cuadro) {
  $cuadro.onclick = function() {
  };
 });
}
function resaltar($cuadro) {
$cuadro.style.opacity = 1;
setTimeout(function() {
  $cuadro.style.opacity = 0.5;
}, 500);
}
function desbloquearInputUsuario() {
document.querySelectorAll('.cuadro').forEach(function($cuadro) {
  $cuadro.onclick = manejarInputUsuario;
});
}
function perder() {
bloquearInputUsuario();
actualziarEstado('perdiste, prueba jugar de nuevo', true);
}