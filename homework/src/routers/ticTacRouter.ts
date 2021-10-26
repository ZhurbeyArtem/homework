import {Router} from 'express';
import { PlayGame, checkGame} from '../controllers/ticTacController'

const router = Router()

router.get('/watch',checkGame)
router.post('/play',PlayGame)

export default router;
