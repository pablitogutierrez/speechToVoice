<?php 
include ('incluir/conexion.php');
$variantes= "SELECT * FROM variantes";
$eje= mysqli_query($con,$variantes);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Variantes</title>
</head>
<body>
    <?php while($asu=mysqli_fetch_array($eje)){ ?>
      <a href="voice.php?id=<?php echo $asu['variante_id']; ?>">
        <?php echo $asu['variante_nombre']?>
      </a>
  <?php }  ?>
</body>
</html>