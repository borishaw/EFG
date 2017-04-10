<?php

$json_response = ['success' => 0, 'message' => ''];
$file = $_FILES['file'];
$error_code = $file['error'];
$file_name = $file['name'];
switch ($error_code) {
	case 1:
		$json_response['message'] = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
		die(json_encode($json_response));
		break;

	case 2:
		$json_response['message'] = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
		die(json_encode($json_response));
		break;

	case 3:
		$json_response['message'] = 'The uploaded file was only partially uploaded';
		die(json_encode($json_response));
		break;

	case 4:
		$json_response['message'] = 'No file was uploaded';
		die(json_encode($json_response));
		break;

	case 6:
		$json_response['message'] = 'Missing a temporary folder';
		die(json_encode($json_response));
		break;

	case 7:
		$json_response['message'] = 'Failed to write file to disk';
		die(json_encode($json_response));
		break;

	case 8:
		$json_response['message'] = 'A PHP extension stopped the file upload';
		die(json_encode($json_response));
		break;
}

move_uploaded_file($_FILES['file']['tmp_name'], "logo/$file_name");

echo $_SERVER['HTTP_REFERER'] . "logo/" . $file_name;