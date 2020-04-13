<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    protected $table = "bet";
    protected $guarded = [];

    public function client(){
        return $this->belongsTo('App\Models\Client', 'client_id');
    }

    public function deal(){
        return $this->belongsTo('App\Models\Deal', 'deal_id');
    }


}
