const url = document.getElementById('url')
const contenedor= document.getElementById('contenedor-qr')

function generarQR(){
    const QR= new QRCode(contenedor,url.value);
}