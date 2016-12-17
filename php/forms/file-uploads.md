###### Add this html to your form:
```
<!-- The data encoding type, enctype, MUST be specified as below -->
<form enctype="multipart/form-data" action="" method="POST">
    <!-- MAX_FILE_SIZE must precede the file input field -->
    <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
    <!-- Name of input element determines name in $_FILES array -->
    Send this file: <input name="userfile" type="file" />
    <input type="submit" named="submitted" value="Send File" />
</form>
```

###### Include these functions in your PHP
```
// Returns a json array with 'success' and 'message' keys. Message lets you know where the file was saved,
// or an error message if there was a problem.
// If displayFile is true, the file will be displayed instead of saved
function handleFileUpload($fileFormFieldName, $uploadsDirectory, $displayFile = false)
{
    $result = array(
        'success' => false,
        'message' => ''
    );
    $errors = fileUploadErrorCheck($_FILES[$fileFormFieldName]);
    if($errors['has-error']) {
        $result['success'] = false;
        $result['message'] = "File upload error encountered: " . $errors['error-message'];
    } else {
        if(is_uploaded_file($_FILES[$fileFormFieldName]['tmp_name'])) {
            if($displayFile) {
                echo "File " . $_FILES[$fileFormFieldName]['name'] . " uploaded successfully.\n";
                echo "Displaying contents\n";
                readfile($_FILES[$fileFormFieldName]['tmp_name']);
            } else {
                $tmpName = $_FILES[$fileFormFieldName]['tmp_name'];
                $baseName = basename($_FILES[$fileFormFieldName]["name"]);

                $fileName = date("Y_m_d H_i_s", time()) . " " . $baseName;

                $savePath = $uploadsDirectory . $fileName;
                if(!move_uploaded_file($tmpName, $savePath)) {
                    $result['success'] = false;
                    $result['message'] = 'Error when attempting to save the file';
                    return $result;
                }
                
                $result['success'] = true;
                $result['message'] = 'File saved to: ' . $savePath;
            }
        } else {
            // someone might be messing with the form inputs
            die("Error with file upload functionality");
        }
    }

    return $result;
}

function fileUploadErrorCheck($fileData) {
    $phpFileUploadErrors = array(
        0 => 'There is no error, the file uploaded with success',
        1 => 'The uploaded file exceeds the maximum file size setting (server)',
        2 => 'The uploaded file exceeds the maximum file size setting (client)',
        3 => 'The uploaded file was only partially uploaded',
        4 => 'No file was uploaded',
        6 => 'A temporary folder is missing on the server',
        7 => 'Failed to write file to disk',
        8 => 'A PHP extension stopped the file upload',
    );

    $errorDetails = array(
        "has-error" => false,
        "error-message" => "Unknown error",
    );

    if($fileData['error'] !== 0) {
        $errorCode = $fileData['error'];
        $errorDetails['has-error'] = true;
        if(isset($phpFileUploadErrors[$errorCode])) {
            $errorDetails['error-message'] = $phpFileUploadErrors[$errorCode];
        }
    }

    return $errorDetails;
}
```
###### Include this at the top of your file:
```
if(isset($_POST['submitted'])) {
    // Note: The destination directory must exist already
    $result = handleFileUpload("userfile", "uploaded-files-dir", false);
}
```

```
