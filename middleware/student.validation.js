module.exports = function (req, res, next) {
    if (req.method === "OPTION") {
        next()
    }

    try {
        if (req.body.name !== undefined) {
            const nameReg = new RegExp('^[a-zA-Z ]{2,30}$')
            const name = req.body.name.trim()
            if (!nameReg.test(name)) {
                if (name.length >= 2 && name.length <= 30) {
                    return res.status(400).json( {message: 'Имя должно содержать только латинские буквы'} )
                } else {
                    return res.status(400).json( {message: 'Имя должно быть длиннее 2 и короче 30 символов'} )
                }
            }
            req.body.name = name
        }

        if (req.body.password !== undefined) {
            const passwordReg = new RegExp('^[a-zA-Z0-9]{2,30}$')
            if (!passwordReg.test(req.body.password)) {
                return res.status(400).json( {message: 'Пароль должнен содержать только латинские буквы и цифры'} )
            }
        }

        if (req.body.class !== undefined) {
            const numberReg = new RegExp('^[0-9]*$')
            if (!numberReg.test(req.body.class)) {
                return res.status(400).json( {message: 'Номер класса должнен содержать только цифру'} )
            }
        }
        next()
    } catch (e) {
        return res.status(400).json( {message: `Something went wrong, try again.`} )
    }
}