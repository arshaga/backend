import express  from 'express'
import { login }  from '../controllers/auth.js'
import {postUser ,updateUser,getUser} from '../controllers/user.js'
import { checkToken } from '../utils/checkAuth.js'




const router = express.Router()
router.post('/login',login)

router.post('/reg',postUser)
router.put('/updateUser',checkToken,updateUser)
router.get('/getuser',checkToken,getUser)

 export default router; 