<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Schema;
use App\Models\Client;
use App\Models\Deal;
use App\Models\Bet;

class MaintenanceController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt');
    }
    
    public function cleanDataBase(){

        try {
            Schema::disableForeignKeyConstraints();
            Bet::query()->truncate();
            Deal::query()->truncate();
            Client::query()->truncate();
            Schema::enableForeignKeyConstraints();
    
            return response()->json(
                ['message' => 'Database was cleaned'],
                200
            );

        } catch( \Exception $e){
            return response()->json(
                ['message' => $e->getMessage()],
                500
            );
            
        }

       
    }


}
