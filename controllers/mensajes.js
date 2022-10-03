
const { response } = require('express');
const mensaje = require('../models/mensaje');
const Mensaje = require('../models/mensaje');

const obtenerChat = async(req ,res = response) => {

    const myId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [{ de: myId, para: mensajesDe }, { de: mensajesDe, para: myId }]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });

}



module.exports = {
    obtenerChat
}