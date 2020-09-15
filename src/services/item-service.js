import axios from "axios";

export async function getItems(){
    try{
        return await axios.get('https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments');
    }catch(err){}
}