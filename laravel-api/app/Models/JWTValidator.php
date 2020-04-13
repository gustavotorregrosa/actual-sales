<?php

namespace App\Models;

use \Lcobucci\JWT\Parser;
use \Lcobucci\JWT\Signer\Hmac\Sha256;
use \Lcobucci\JWT\ValidationData;


class JWTValidator
{

    function __construct($request)
    {
        $this->request = $request;
        $this->jwt = $this->request->header('jwt');
    }


    public function isStringJwt(){
        return (strlen($this->jwt) > 10);
    }


    public function isJwtValid($validity = 1)
    {
        if(!$this->isStringJwt()){
            return false;
        }

        $token = (new Parser())->parse((string) $this->jwt);
        $signer = new Sha256();
        $dataValidation = new ValidationData();
        if ($token->validate($dataValidation) && $token->verify($signer, env('APP_KEY'))) {
            $validity *= 30;
            if (($token->getClaim('iat') + $validity >= time()) && ($token->getClaim('iat') <= time())) {
                return true;
            }
        }
        return false;
    }


    public function userFromToken()
    {
        if(!$this->isStringJwt()){
            return false;
        }
        $token = (new Parser())->parse((string) $this->jwt);
        return [
            'id' => $token->getClaim('id'),
            'email' => $token->getClaim('email')
        ];
    }


    public function userObject()
    {
        $userTokenObj = $this->userFromToken();
        $user = new User();
        $user->id = $userTokenObj['id'];
        $user->email = $userTokenObj['email'];
        return $user;
    }


    public function userFromDatabase()
    {
        $userTokenObj = $this->userFromToken();
        if ($user = User::where('id', $userTokenObj['id'])->where('email', $userTokenObj['email'])->first()) {
            return $user;
        }
        return false;
    }

    public function refreshToken()
    {
        $validity = 24 * 15;
        if (!$this->isJwtValid($validity)) {
            return false;
        }
        
        if ($user = $this->userFromDatabase()) {
            return self::userData($user);
        }
    }


    static public function userData($user)
    {
        return [
            'user' => [
                'name' => $user->name,
                'email' => $user->email
            ],
            'jwt' => self::userToken($user)
        ];
    }

    static public function userToken($user)
    {
        function generatePartialString($arr)
        {
            $arr = json_encode($arr);
            $str = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($arr));
            return $str;
        }
        $headers = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];
        $claims = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'iat' => time()
        ];
        $token = generatePartialString($headers);
        $token .= "." . generatePartialString($claims);
        $signature = hash_hmac('sha256', $token, env('APP_KEY'), true);
        $signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $token .= "." . $signature;
        return $token;
    }
}
