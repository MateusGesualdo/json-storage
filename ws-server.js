import { WebSocketServer } from 'ws';
import {readFileSync, writeFileSync} from 'fs'

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

    console.log('nova partida iniciada')

    let randomNumber = Math.floor(101*Math.random())

    let playerName

    ws.on('error', console.error);

    ws.on('message', function message(data) {
    
        const message = JSON.parse(data.toString())
        
        if (message.player !== undefined){
            playerName = message.player
            ws.send('{"message":"Nome registrado"}')
        }

        if(message.guess !== undefined){
            let playerWon = randomNumber === message

            ws.send(JSON.stringify({playerWon}))
        }
    });

    ws.on('close', () => {
        console.log('conexao encerrada')
    })

});

console.log('ultima linha do arquivo demo')