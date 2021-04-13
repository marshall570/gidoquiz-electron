const api = require('../../service/api')

function handle_load() {
    try {
        api.get('/total').then(response => {
            localStorage.setItem('registered_questions', Number(response.data.total_perguntas))
        })
    } catch (error) {
        alert(error)
    }
}

function handle_play() {
    const registered_questions = Number(localStorage.getItem('registered_questions'))

    if (registered_questions === 0) {
        alert('Não existem perguntas cadastradas no sistema!\nPor favor clique em <CADASTRAR PERGUNTAS> para cadastrar novas perguntas.')
    } else {
        window.location.href = '../game/index.html'
    }
}

function handle_setup() {
    window.location.href = '../setup/index.html'
}