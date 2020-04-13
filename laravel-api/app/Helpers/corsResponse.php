<?php

function corsResponse($content, $code, $message = null)
{
    if($message){
        $content['message'] = $message;
    }
    $content = json_encode($content);
    $response = response($content, $code);
    $response->header('Content-Type', 'application/json');
    $response->header('Access-Control-Allow-Origin', '*');
    return $response;
}
