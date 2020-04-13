<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\JWTValidator;

class CheckJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $jwtValidator = new JWTValidator($request);
        if ($jwtValidator->isJwtValid()) {
            \Auth::login($jwtValidator->userObject());
            return $next($request);
        }
   
        if ($refreshContent = $jwtValidator->refreshToken()) {
            return corsResponse($refreshContent, 203);
        }
        return corsResponse(["redirect"], 301, "Login with password");
    }


    public function terminate($request, $response)
    {
        if (\Auth::check()) {
            \Auth::logout();
        }   
    }
}
