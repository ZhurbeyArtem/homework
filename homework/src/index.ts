import express from 'express'
import bodyParser from "body-parser";
import ticTacRouter from './routers/ticTacRouter'
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',ticTacRouter)
const start = async () =>{
    try {
        app.listen(PORT, ()=> console.log('server start on port: ' + PORT))
        //     const doc =  yaml.load(fs.readFileSync('./tictactoe.yaml', 'utf8'));
        // console.log(doc);
    }
    catch (e){
        console.log(e)
    }
}
start()

