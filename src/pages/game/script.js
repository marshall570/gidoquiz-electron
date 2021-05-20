const api = require('../../service/api')

function handle_load() {
    get_total()
    localStorage.setItem('current_question', 1)

    localStorage.setItem('tha_score', 0)
    localStorage.setItem('nyx_score', 0)
    localStorage.setItem('raf_score', 0)
    localStorage.setItem('bdtw_score', 0)
    localStorage.setItem('gdv_score', 0)
    localStorage.setItem('vis_score', 0)
    localStorage.setItem('ltr_score', 0)
    localStorage.setItem('aap_score', 0)

    document.querySelector('p#tha_score').textContent = localStorage.getItem('tha_score')
    document.querySelector('p#nyx_score').textContent = localStorage.getItem('nyx_score')
    document.querySelector('p#raf_score').textContent = localStorage.getItem('raf_score')
    document.querySelector('p#bdtw_score').textContent = localStorage.getItem('bdtw_score')
    document.querySelector('p#gdv_score').textContent = localStorage.getItem('gdv_score')
    document.querySelector('p#vis_score').textContent = localStorage.getItem('vis_score')
    document.querySelector('p#ltr_score').textContent = localStorage.getItem('ltr_score')
    document.querySelector('p#aap_score').textContent = localStorage.getItem('aap_score')

    select_question()
}

function handle_score_plus(team) {
    const tmp_score = Number(localStorage.getItem(team))
    localStorage.setItem(team, Number(tmp_score + 1))

    document.querySelector(`p#${team}`).textContent = Number(localStorage.getItem(team))

    if (Number(localStorage.getItem(team)) >= 0) {
        document.querySelector(`p#${team}`).style.color = 'inherit'
    }
}

function handle_score_minus(team) {
    const tmp_score = Number(localStorage.getItem(team))
    localStorage.setItem(team, Number(tmp_score - 1))

    document.querySelector(`p#${team}`).textContent = Number(localStorage.getItem(team))

    if (Number(localStorage.getItem(team)) < 0) {
        document.querySelector(`p#${team}`).style.color = 'red'
    }
}

function handle_question_back() {
    const tmp_question = Number(localStorage.getItem('current_question'))

    if ((tmp_question - 1) >= 1) {
        localStorage.setItem('current_question', Number(tmp_question - 1))

        select_question()
    } else {
        alert('Não é possível voltar mais uma questão')
    }
}

function handle_question_fwd() {
    const tmp_question = Number(localStorage.getItem('current_question'))

    if ((tmp_question + 1) <= Number(localStorage.getItem('total_questions'))) {
        localStorage.setItem('current_question', Number(tmp_question + 1))

        select_question()
    } else {
        alert('Não é possível avançar mais uma questão')
    }
}

function select_question() {
    try {
        api.get(`game?qid=${localStorage.getItem('current_question')}&tn=${localStorage.getItem('dataset')}`).then(response => {
            localStorage.setItem('answered', 'no')

            const values = response.data

            document.querySelector('h1#question_header').textContent = `QUESTÃO ${localStorage.getItem('current_question')}`

            document.querySelector('h2#question_text').textContent = values.pergunta

            document.querySelector('span#a').textContent = `A) ${values.alt_a}`
            document.querySelector('span#b').textContent = `B) ${values.alt_b}`
            document.querySelector('span#c').textContent = `C) ${values.alt_c}`
            document.querySelector('span#d').textContent = `D) ${values.alt_d}`

            localStorage.setItem('answer', values.resposta)

            document.querySelector(`span#a`).style.background = '#ffffff'
            document.querySelector(`span#a`).style.color = 'inherit'

            document.querySelector(`span#b`).style.background = '#ffffff'
            document.querySelector(`span#b`).style.color = 'inherit'

            document.querySelector(`span#c`).style.background = '#ffffff'
            document.querySelector(`span#c`).style.color = 'inherit'

            document.querySelector(`span#d`).style.background = '#ffffff'
            document.querySelector(`span#d`).style.color = 'inherit'

            team_color(values.equipe)
        })
    } catch (error) {
        alert(error)
    }
}

function handle_answer(alt) {
    const answer = localStorage.getItem('answer')

    if (localStorage.getItem('answered') === 'no') {
        if (alt === answer) {
            document.querySelector(`span#${alt}`).style.background = 'green'
            document.querySelector(`span#${alt}`).style.color = 'white'
        } else {
            document.querySelector(`span#${alt}`).style.background = 'red'
            document.querySelector(`span#${alt}`).style.color = 'white'

            document.querySelector(`span#${answer}`).style.background = 'green'
            document.querySelector(`span#${answer}`).style.color = 'white'
        }

        localStorage.setItem('answered', 'yes')
    }
}

function get_total() {
    try {
        api.get(`/total?tn=${localStorage.getItem('dataset')}`).then(response => {
            localStorage.setItem('total_questions', Number(response.data.total_perguntas))
        })
    } catch (error) {
        alert(error)
    }
}

function pop_wildcard(team) {
    document.querySelector(`label#${team}`).remove()
}

function team_color(team) {
    switch (team) {
        case 'tha':
            document.body.style.background = '#fd1115'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'nyx':
            document.body.style.background = '#191b1f'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'raf':
            document.body.style.background = '#d58d9c'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'bdtw':
            document.body.style.background = '#ff6600'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'gdv':
            document.body.style.background = '#ffc400'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'vis':
            document.body.style.background = '#009cbf'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'ltr':
            document.body.style.background = '#4d0080'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        case 'aap':
            document.body.style.background = '#00801c'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break

        default:
            document.body.style.background = '#4c9697'
            document.querySelector('h1#question_header').style.color = '#ffffff'
            document.querySelector('span#question_back').style.color = '#ffffff'
            document.querySelector('span#question_fwd').style.color = '#ffffff'
            break
    }
}