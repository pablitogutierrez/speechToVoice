<?php 
include ('conexion.php');
$id = $_GET['id'];
$info ="SELECT * FROM variantes WHERE variante_id=$id";
$eje = mysqli_query($con,$info);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha512-cLuyDTDg9CSseBSFWNd4wkEaZ0TBEpclX0zD3D6HjI19pO39M58AgJ1SjHp6c7ZOp0/OCRcC2BCvvySU9KJaGw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script defer src="script.js"></script>
    <script defer src="qr.js"></script>
    <title>Texto a voz</title>
    <link rel="stylesheet" type="text/css" href="voice.css">
</head>
<body>
    <form class="form">
        <select id="languages"></select>
        <!--
        <select id="container_voices"></select>
        -->
        <?php   
            while($asu=mysqli_fetch_array($eje)){ ?>
                <input type="text" id="from-text" readonly value="<?php echo $asu['variante_nombre'] . " " . $asu['variante_desc'];?>"></textarea>
        <?php } ?>
        <input type="text" id="to-text" hidden>
        <button type="button" id="btn">Hablar</button> 
        <button type="button" id="btn-2">Parar</button>
    </form>
</body>
</html>