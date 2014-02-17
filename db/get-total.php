<?php 
  
  include 'db.php';

  $conn = mysql_connect($host,$user,$pass);
  $dbs = mysql_select_db($databaseName, $conn);

  $result = mysql_query("SELECT $fieldName FROM $tableName") or die("SELECT Error: ".mysql_error());
  $array = mysql_fetch_row($result);    
  
  echo $array[0];

?>