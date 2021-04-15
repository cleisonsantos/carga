const Excel = require('exceljs')
const formidable = require('formidable')
const fs = require('fs')
const knex = require('../config/database')

module.exports = {

    async index(req, res) {

        data = {
            page: "product/index",
            title: "Produtos"
        }

        return await res.render('index', data)

    },

    async store(req, res) {

        const form = new formidable.IncomingForm()
        form.on('error', function (err) { console.log(err); });
        form.parse(req, (err, fields, files) => {

            const oldpath = files.planilha.path
            const workbook = new Excel.Workbook()

            workbook.xlsx.readFile(oldpath).then((data) => {

                const rows = data.getWorksheet().getSheetValues()
                for (let index = 2; index < rows.length; index++) {
                    const row = rows[index]
                    console.log(row)
                    knex.insert({
                        nome: row[1],
                        quantidade: row[2],
                        valor: row[3]
                    }).into('produtos')
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
                return res.status(200).json({
                    success: true,
                    code: 200,
                    msg: "Dados Importados com sucesso!"
                })

            })
        })
    }
}