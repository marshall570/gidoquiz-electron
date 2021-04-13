const api = require('../../service/api')

function handle_save() {
    const question = document.querySelector('textarea#txt_question').value
    const alt_a = document.querySelector('textarea#txt_alt_a').value
    const alt_b = document.querySelector('textarea#txt_alt_b').value
    const alt_c = document.querySelector('textarea#txt_alt_c').value
    const alt_d = document.querySelector('textarea#txt_alt_d').value
    const answer = document.querySelector('select#cmb_answer').value
    const team = document.querySelector('select#cmb_team').value

    const fields = [question, alt_a, alt_b, alt_c, alt_d]

    if (check_fields(fields)) {
        if (confirm('Deseja cadastrar essa pergunta?')) {
            try {
                const data = {
                    "pergunta": question,
                    "alt_a": alt_a,
                    "alt_b": alt_b,
                    "alt_c": alt_c,
                    "alt_d": alt_d,
                    "resposta": answer,
                    "equipe": team
                }

                api.post('game', data).then((response) => {
                    if (response.status === 201) {
                        alert('Pergunta cadastrada com sucesso!')
                    } else {
                        alert('Algo deu errado, tente novamente.')
                    }
                })
            } catch (error) {
                alert(error)
            }
        }
    } else {
        alert('ERRO!!!\nAlguns campos não foram preenchidos corretamente.\nRevise-os e tente novamente.')
    }
}

function check_fields(fields) {
    for (let index = 0; index < fields.length; index++) {
        if (fields[index].length <= 3) {
            return false
        }
    }

    return true
}

function handle_spreadsheet() {
    try {
        api.get('questions').then((response) => {
            const fs = require('fs')
            const os = require('os').homedir()

            if (process.platform === 'win32') {
                fs.writeFileSync(`${os}\\Documents\\perguntas.json`, JSON.stringify(response.data))
            } else {
                fs.writeFileSync(`${os}/Documentos/perguntas.json`, JSON.stringify(response.data))
            }

            alert('JSON gerado com sucesso')
        })
    } catch (error) {
        alert(error)
    }
}

function handle_back() {
    if (confirm('Deseja retornar ao menu principal?\n(Todo o progresso não salvo será perdido)')) {
        window.location.href = '../main_menu/index.html'
    }
}

function handle_nuke() {
    if (confirm('DESEJA DELETAR TODAS AS PERGUNTAS CADASTRADAS?')) {
        if (confirm('TEM CERTEZA?\nNão será possível recuperar as perguntas excluídas.')) {
            try {
                api.delete('nuke').then((response) => {
                    if (response.status === 204) {
                        alert('Perguntas deletadas com sucesso!')
                    }
                })
            } catch (error) {
                alert(error)
            }
        }
    }
}
