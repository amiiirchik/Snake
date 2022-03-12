<?php
file_put_contents(
    'requests.txt',
    file_get_contents('php://input') . PHP_EOL,
    FILE_APPEND
);
// echo json_encode('Я съел яблоко');