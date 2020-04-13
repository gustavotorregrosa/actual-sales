<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = "client";
    protected $guarded = [];

    public function bets(){
        return $this->hasMany('App\Models\Bet','client_id');
    }

}
