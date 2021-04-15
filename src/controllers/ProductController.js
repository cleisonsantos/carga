const xlsx = require('xlsx')

module.exports = {
    
    async index(req, res) {
        
        data = {
            page: "product/index",
            title: "Produtos"
        }

        return await res.render('index', data)

    },

    async store(req, res) {

        const { planilha } = req.body
        // const data = xlsx.read(planilha, {
        //     type: "string",
        //     raw: false,
        //     cellText: true,
        //     sheets
        // })
        const data = planilha.xlsx.utils.sheet_to_json()
        return await res.json(data)
    }

}