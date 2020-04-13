<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Client;
use App\Models\Deal;
use App\Models\Bet;

class ReportsController extends Controller
{
    

    public function __construct()
    {
        $this->middleware('jwt');
    }

    public function clients(){
        $clients = Client::all();
        return response()->json(
            ['data' => $clients],
            200
        );
    }

    public function deals(){
        $deals = Deal::all();
        return response()->json(
            ['data' => $deals],
            200
        );
    }


    public function client($id) {
        $client = Client::with('bets.deal')->find($id);
        return response()->json(
            ['client' => $client],
            200
        );
    }

    public function deal($id) {
        $deal = Deal::with('bets.client')->find($id);
        return response()->json(
            ['deal' => $deal],
            200
        );
    }

    public function clientsWithBets(){
        $clients = Client::with('bets.deal')->orderBy('name')->get();
        return response()->json(
            ['data' => $clients],
            200
        );
    }

    public function bets(){
        $bets = Bet::with(['deal', 'client'])->get();
        return response()->json(
            ['data' => $bets],
            200
        );
    }


}
