module.exports = function (req, res, next) {
    if (req.method === "OPTION") {
        next()
    }

    try {
        if (req.body.name !== undefined) {
            const nameReg = new RegExp('^[a-zA-Z ]{2,40}$')
            const name = req.body.name.trim()
            if (!nameReg.test(name)) {
                if (name.length >= 2 && name.length <= 40) {
                    return res.status(400).json( {message: 'Имя должно содержать только латинские буквы'} )
                } else {
                    return res.status(400).json( {message: 'Имя должно быть длиннее 2 и короче 40 символов'} )
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

        if (req.body.discipline !== undefined) {
            const numberReg = new RegExp('^[a-zA-Z ]{2,30}$')
            const discipline = req.body.discipline.trim()
            if (!numberReg.test(discipline)) {
                return res.status(400).json( {message: 'Название дисциплины должно содержать только латинские буквы'} )
            }
        }
        next()
    } catch (e) {
        return res.status(400).json( {message: `Something went wrong, try again.`} )
    }
}