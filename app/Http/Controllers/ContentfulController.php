<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
// use Contentful\Delivery\Client as DeliveryClient;
use Illuminate\Http\Request;

class ContentfulController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new \Contentful\Delivery\Client(env('CONTENTFUL_DELIVERY_TOKEN'), env('CONTENTFUL_SPACE_ID'), env('CONTENTFUL_ENVIRONMENT_ID'));
        $this->query = new \Contentful\Delivery\Query();
        // $this->environment = $this->client->getEnvironmentProxy(env('CONTENTFUL_SPACE_ID'), env('CONTENTFUL_ENVIRONMENT_ID'));
    }
    // public function __construct(){
    //     $this->client = new \Contentful\Delivery\Client( env('ACCESS_TOKEN'), env('SPACE_ID') );
    //     $this->query = new \Contentful\Delivery\Query();
    // }

    public function index(){
        $entries = $this->client->getEntries();
        print json_encode($entries);
    }

    public function getContent(Request $request){
        $data = $request->all();

        $this->query->setContentType($data['contentId'])
            ->where('fields.parent', 'true')
            ->setInclude(1);
        try {
            $products = $this->client->getEntries($this->query);
            print json_encode($products);
        } catch (\Throwable $th) {
            echo '';
        }
    }
    /*********************  getEntries  **********************/
    public function getEntries(Request $request){
        $data = $request->all();

        $this->query->setContentType($data['contentId'])
            ->where('fields.power', $data['entry'])
            ->setInclude(1);
        try {
            $products = $this->client->getEntries($this->query);
            print json_encode($products);
        } catch (\Throwable $th) {
            echo '';
        }
    }

    public function getEntriesInfo(Request $request){
        $data = $request->all();

        try {
            $entry = $this->client->getEntry($data['entry_id']);
            print json_encode($entry);
        } catch (\Throwable $th) {
            echo '';
        }
    }

}