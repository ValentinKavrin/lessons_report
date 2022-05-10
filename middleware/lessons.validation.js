
module.exports = function (req, res, next) {
    if (req.method === "OPTION") {
        next()
    }

    try {
        const titleReg = new RegExp('^[a-zA-Z0-9 ]{3,30}$');
        const dateReg = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
        const daysReg = new RegExp('^[0-6]$')

        const days = req.body.days
        const date = req.body.firstDate
        const title = req.body.title.trim()

        if (title !== '') {
            if (!titleReg.test(title)) {
                if (3 < title.length < 30) {
                    return res.status(400).json('Название должно быть длиннее 3 и короче 30 символов')
                } else {
                    return res.status(400).json('Название должно содержать только латинские буквы и цифры')
                }
            }
            req.body.title = title
        } else {
            return res.status(400).json('Название не может быть пустым')
        }

        if (!dateReg.test(date)) return res.status(400).json('Введите дату в формате 2000-01-01')

        days.forEach((elem) => {
            if (!daysReg.test(elem) && (0 < elem < 7)) {
                return res.status(400).json('Диапозон дней должен быть от 0 до 6')
            }
        })

        next()
    } catch (e) {
        return res.status(400).json( {message: `Something went wrong, try again.`} )
    }
}