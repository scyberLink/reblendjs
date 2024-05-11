<?php
$command = 'cd ../ && git pull';
$output = shell_exec($command);
if ($output) {
    echo $output;
} else {
    echo "Error";
}
/* 
#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

repo=$1

cd $SCRIPT_DIR/../$repo

git pull

*/

?>