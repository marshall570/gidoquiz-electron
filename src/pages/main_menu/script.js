const api = require('../../service/api')

function handle_play() {
    try {
        const team = document.querySelector('select#cmb_team').value
        const password = document.querySelector('input#txt_password').value

        const pins = {
            tha: 'm0rDr3d',
            nyx: 'S1egFr13d',
            raf: '4sT0lfo',
            bdtwd: 'A7aL4nt3',
            gdv: '1sK4nD3r',
            vis: 'J34ne',
            ltr: '9ilg4M3sh',
            aap: 'P3Ndr490n'
        }

        if (password === pins[team]) {
            api.get(`/total?tn=${team}`).then(response => {
                if (Number(response.data.total_perguntas) === 0) {
                    alert('Não existem perguntas cadastradas no sistema!')
                } else {
                    localStorage.setItem('dataset', team)
                    window.location.href = '../game/index.html'
                }
            })
        } else {
            alert(`SENHA INCORRETA PARA A EQUIPE ${team.toUpperCase()}`)
        }
    } catch (error) {
        alert(error)
    }
}
