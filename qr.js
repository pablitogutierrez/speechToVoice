let QR;
let qrImageData;
const url = document.getElementById('url');
const contenedor= document.getElementById('contenedor-qr');

function generarQR(){
    QR = new QRious({
        value: url.value,
        size: 100
    });
    qrImageData = QR.toDataURL();
    contenedor.src= qrImageData
}

function generarPDF(){
    const doc = new jsPDF()
    doc.addImage(qrImageData, 'PNG', 50, 50, 120, 120);
    doc.save('QR.pdf')
}
