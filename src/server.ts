import { Server } from "http";
import app from "./app";
import config from "./config";



let server: Server;

function main() {
    try{
         server = app.listen(config.port, () => {
         console.log("secure notes server is running on port", config.port);
    });

    }catch(error){
        console.log(`Error is ${error}`)
    }
}

// server call
main()


