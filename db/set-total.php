<?php 
  
  include 'db.php';

  $usrtime = $_POST['usrtime'];

  $conn = mysql_connect($host,$user,$pass);
  $dbs = mysql_select_db($databaseName, $conn);

  mysql_query("UPDATE $tableName SET $fieldName = $fieldName + $usrtime") or die (mysql_error());

?>