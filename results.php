<?
if ($_SERVER['REQUEST_METHOD'] != 'POST'){
    header('location: index.html');
}

$post_data = file_get_contents("php://input");
$footers = json_decode($post_data, true);

$path_array = [];

foreach ($footers as $key => $footer){
    $index = $key + 1;
    $path = "footers/" . "footer" . $index . ".html";

    $file = fopen($path, "w");
    file_put_contents($path, $footer);

    array_push($path_array, $path);
}

$zip = new ZipArchive();
$file_name = "footers.zip";

if ($zip->open($file_name, ZipArchive::CREATE)!==TRUE) {
    exit("cannot open <$file_name>\n");
}

foreach ($path_array as $path){
    $zip->addFile($path);
}

$zip->close();

foreach ($path_array as $path){
    unlink($path);
}

echo $file_name;