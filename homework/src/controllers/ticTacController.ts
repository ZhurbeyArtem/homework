import {NextFunction, Request,  Response} from 'express';

let player: string = 'X'
let field: string [] = ['*', '*', '*', '*', '*', '*', '*', '*', '*']
let count: number = 0
let winner: string = ''

export const checkGame = (req:Request,res:Response) => {
    res.status(200).send(field[0] + '|' + field[1] + '|' + field[2] + '\n' +
        '-' + '+' + '-' + '+' + '-' + '\n' +
        field[3] + '|' + field[4] + '|' + field[5] + '\n' +
        '-' + '+' + '-' + '+' + '-' + '\n' +
        field[6] + '|' + field[7] + '|' + field[8] + '\n')

}

export const PlayGame = (req: Request, res: Response, next: NextFunction) => {
    try {

        let step: number = 0
        let {long, width} = req.body
        // провірка на тип данних
        if (typeof width != "number" || typeof long != 'number') return res.status(500).json('Тип данних повинен бути number')
        // провірка чи існують такі клітинки
       if (long <= 0 || long > 3 || width <= 0 || width > 3)return  res.status(400).json('Такой клітинки не існує')

        if (long === 1) {
            long = 0
            step = long + width - 1
        }
        if (long === 2) {
            step = long + width
        }
        if (long === 3) {
            long = 5
            step = long + width
        }

        if (field[step] === 'X' || field[step] === 'O') {
            return res.status(400).send('Дана клітинка вже занята, оберіть іншу клітинку')
        }

// ход
        field[step] = player
      // міняєм Х на О і наоборот
        checkPlayer()
        // щитаєм який ход по щоту шоб єслі дойде до 9 була нічія
        count++
        // провіряєм чи не зібралась виграшна комбінація
        checkWinner()
        // в случаї победи очистим поле,победітеля і щотчик щоб грати заново
        if (winner === "X" || winner === "O") {
            field = ['*', '*', '*', '*', '*', '*', '*', '*', '*']
            let x = winner
            winner = ''
            count = 0
            return res.status(200).send(`Виграв ${x}`)
        }

        if (count === 9) {
            field = ['*', '*', '*', '*', '*', '*', '*', '*', '*']
            count = 0
            return res.send('Нічія')
        }

        res.status(200).send(field[0] + '|' + field[1] + '|' + field[2] + '\n' +
            '-' + '+' + '-' + '+' + '-' + '\n' +
            field[3] + '|' + field[4] + '|' + field[5] + '\n' +
            '-' + '+' + '-' + '+' + '-' + '\n' +
            field[6] + '|' + field[7] + '|' + field[8] + '\n')

    } catch (e) {
        res.status(500).send(e)
    }


}
const checkPlayer = () => {
    player === 'X' ? player = 'O' : player = 'X'
}

const checkWinner = () => {
    if (field[0] == 'X' && field[1] == 'X' && field[2] == 'X') winner = 'X';
    if (field[3] == 'X' && field[4] == 'X' && field[5] == 'X') winner = 'X';
    if (field[6] == 'X' && field[7] == 'X' && field[8] == 'X') winner = 'X';
    if (field[0] == 'X' && field[3] == 'X' && field[6] == 'X') winner = 'X';
    if (field[1] == 'X' && field[4] == 'X' && field[7] == 'X') winner = 'X';
    if (field[2] == 'X' && field[5] == 'X' && field[8] == 'X') winner = 'X';
    if (field[0] == 'X' && field[4] == 'X' && field[8] == 'X') winner = 'X';
    if (field[2] == 'X' && field[4] == 'X' && field[6] == 'X') winner = 'X';
    //нолики
    if (field[0] == 'O' && field[1] == 'O' && field[2] == 'O') winner = 'O';
    if (field[3] == 'O' && field[4] == 'O' && field[5] == 'O') winner = 'O';
    if (field[6] == 'O' && field[7] == 'O' && field[8] == 'O') winner = 'O';
    if (field[0] == 'O' && field[3] == 'O' && field[6] == 'O') winner = 'O';
    if (field[1] == 'O' && field[4] == 'O' && field[7] == 'O') winner = 'O';
    if (field[2] == 'O' && field[5] == 'O' && field[8] == 'O') winner = 'O';
    if (field[0] == 'O' && field[4] == 'O' && field[8] == 'O') winner = 'O';
    if (field[2] == 'O' && field[4] == 'O' && field[6] == 'O') winner = 'O';
}

export default {checkGame,PlayGame};