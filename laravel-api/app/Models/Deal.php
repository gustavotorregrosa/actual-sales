<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $table = "deal";
    protected $guarded = [];

    public function bets(){
        return $this->hasMany('App\Models\Bet','deal_id');
    }


}
