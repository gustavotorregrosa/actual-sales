<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Client;
use App\Models\Deal;
use App\Models\Bet;

class FileController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $registerProcessedArray = [];
        try {
            $file = $request->files->get('myFiles');
            $registersRawArray = $this->convertFileToArray($file);
            $clientDelimiter = " @";
            $dealDemiliter = " #";
            $registerProcessedArray = process_array($registersRawArray, $clientDelimiter, $dealDemiliter);

            foreach ($registerProcessedArray['clients'] as $client) {
                Client::firstOrCreate($client);
            }

            foreach ($registerProcessedArray['deals'] as $deal) {
                Deal::firstOrCreate($deal);
            }

            foreach ($registerProcessedArray['bets'] as $bet) {
                $betToCreate = [
                    'client_id' => $bet['client']['id'],
                    'deal_id' => $bet['deal']['id'],
                    'hour' => $bet['hour'],
                    'accepted' => $bet['accepted'],
                    'refused' => $bet['refused']
                ];

                Bet::firstOrCreate($betToCreate);
            }
        } catch (\Exception $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                500
            );
        }

        return response()->json(
            ['message' => 'CSV import was successfull'],
            200
        );
    
    }



    public function convertFileToArray($file)
    {
        $registersRawArray = [];
        if ($fileName = is_csv($file)) {
            if (!($registersRawArray = generate_array($fileName))) {
                throw new \Exception('This CSV file is probably broken', 1);
                return;
                // return response()->json(
                //     ['message' => 'This CSV file is probably broken'], 500
                // );
            }
        } else {
            throw new \Exception('Not a CSV file', 1);
            return;
            // return response()->json(
            //     ['message' => 'Not a CSV file'], 500
            // );
        }

        return $registersRawArray;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
