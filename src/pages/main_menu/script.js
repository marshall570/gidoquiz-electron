const { select } = require('../../../../backend/src/controller/game_controller')
const api = require('../../service/api')

function handle_play() {
    try {
        const team = document.querySelector('select#cmb_team').value

        api.get(`/total?tn=${team}`).then(response => {
            if (Number(response.data.total_perguntas) === 0) {
                alert('Não existem perguntas cadastradas no sistema!\nPor favor clique em <CADASTRAR PERGUNTAS> para cadastrar novas perguntas.')
            } else {
                localStorage.setItem('dataset', team)
                window.location.href = '../game/index.html'
            }
        })
    } catch (error) {
        alert(error)
    }


}

function handle_setup() {
    window.location.href = '../setup/index.html'
}