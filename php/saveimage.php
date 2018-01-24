<?php



function saveimage($fileup, $type, $name, $phone){ //function parameters, two variables.

    if(!file_exists($fileup['tmp_name']) || !is_uploaded_file($fileup['tmp_name'])) {
        $filepath = NULL;
        return NULL;
    }


    $filepath = NULL; // return value

    $target_dir = "../uploads/" . $type . "/";
    $target_file = $target_dir . basename($fileup['name']);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);


    // Check file size 5MB limit
    if ($fileup["size"] > 5000000) {
        return $filepath; // return null
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        return $filepath; // return null
    }

    $timenow = time();

    $temp = explode(".", $fileup["name"]);
    $newfilename = $phone . '_' . $timenow . '_' . $name . '.' . end($temp);
    $target_file = $target_dir . $newfilename;

    if (move_uploaded_file($fileup["tmp_name"], $target_file)) {
        $filepath =  $target_file;
    } 

    return $filepath;  //return something 
  }




?>