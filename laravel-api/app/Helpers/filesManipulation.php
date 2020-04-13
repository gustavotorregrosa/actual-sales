<?php

if (! function_exists('is_csv')) {
    function is_csv($file) {
        if($file->getClientMimeType() == 'text/csv'){
            return $file->getRealPath();
        }
        return false;
    }
}

if (! function_exists('generate_array')) {
    function generate_array($fileName) {
        $arrayCSV = [];
        $csvFile = fopen($fileName, 'r');

        try {
            $fields = fgetcsv($csvFile);
            while(!feof($csvFile)){
                if($lineRaw = fgetcsv($csvFile)){
                    $line = [];
                    foreach($fields as $i => $fieldName){
                        $line[$fieldName] = $lineRaw[$i];
                    }  
                    $arrayCSV[] = $line;
                }
            }
            fclose($csvFile);
            return $arrayCSV;
        } catch (\Exception $e){
            return false;
        }
    }
}


if (! function_exists('process_array')) {
    function process_array($betsRawArray, $clientDelimiter, $dealDelimiter){
        $uniqueClients = [];
        $uniqueDeals = [];
        $betsBundle = [];

        foreach($betsRawArray as $bet) {
            try {
                $betProcessed = $bet;
                
                $client = split_name_id($bet['client'], $clientDelimiter);
                $betProcessed['client'] = $client; 

                $deal = split_name_id($bet['deal'], $dealDelimiter);
                $betProcessed['deal'] = $deal;

                $hour = DateTime::createFromFormat("d-m-y H:i", $bet['hour']);
                $betProcessed['hour'] = $hour->format('Y-m-d H:i:s');
                
                $betsBundle[] = $betProcessed;

            } catch (\Exception $e){
               throw $e;
            }

           
            try{
                if(check_is_new($client, $uniqueClients)){
                    $uniqueClients[] = $client;
                }

                if(check_is_new($deal, $uniqueDeals)){
                    $uniqueDeals[] = $deal;
                }
            } catch (\Exception $e){
                throw $e;
                return;
            }
        }
        return [
            'clients' => $uniqueClients,
            'deals' => $uniqueDeals,
            'bets' =>  $betsBundle
        ];
    }
}


if (! function_exists('split_name_id')) {
    function split_name_id($string, $delimiter){
        $auxSplit = explode($delimiter, $string);
        return [
            'name' => $auxSplit[0],
            'id' => $auxSplit[1]
        ];
    }
}


if (! function_exists('check_is_new')) {
    function check_is_new($newElement, $comparedArray){
        $isNew = true;
        foreach($comparedArray as $register){
            if($register['id'] == $newElement['id']){
                if($register['name'] == $newElement['name']){
                    $isNew = false;
                    break;
                } else {
                    throw new Exception("File contains two names for the same id", 1); 
                }
            }
        }
        return $isNew;
    }
}








