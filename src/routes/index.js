const { Router } = require('express')
const router = Router()

const webpush = require('../webpush')
let pushSuscripcion

router.post('/suscripcion', async (req, res) => {
    //punto a donde se enviará la notificacion
    console.log(req.body)
    pushSuscripcion = req.body
    res.status(200).json()
})

router.post('/new-message', async (req, res) => {
    const { message } = req.body
    
    const payload = JSON.stringify({
        title: 'Mi notificacions',
        message: message
    }) 

    try {
        await webpush.sendNotification(pushSuscripcion, payload)
    } catch (e) {
        console.log("Mostrando error", e)
    }

})

module.exports = router