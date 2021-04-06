const api = require('./service/api')

function handle_load() {
    get_total()
    localStorage.setItem('current_question', 1)

    localStorage.setItem('world_score', 0)
    localStorage.setItem('nyx_score', 0)
    localStorage.setItem('priestess_score', 0)
    localStorage.setItem('bdtw_score', 0)
    localStorage.setItem('gdv_score', 0)
    localStorage.setItem('vis_score', 0)
    localStorage.setItem('lovers_score', 0)
    localStorage.setItem('judgement_score', 0)

    document.querySelector('p#world_score').textContent = localStorage.getItem('world_score')
    document.querySelector('p#nyx_score').textContent = localStorage.getItem('nyx_score')
    document.querySelector('p#priestess_score').textContent = localStorage.getItem('priestess_score')
    document.querySelector('p#bdtw_score').textContent = localStorage.getItem('bdtw_score')
    document.querySelector('p#gdv_score').textContent = localStorage.getItem('gdv_score')
    document.querySelector('p#vis_score').textContent = localStorage.getItem('vis_score')
    document.querySelector('p#lovers_score').textContent = localStorage.getItem('lovers_score')
    document.querySelector('p#judgement_score').textContent = localStorage.getItem('judgement_score')

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
        api.get(`game?qid=${localStorage.getItem('current_question')}`).then(response => {
            const values = response.data[0]
            
            document.querySelector('h1#question_header').textContent = `QUESTÃO POR EQUIPE ${values.equipe.toUpperCase()}`

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
        })
    } catch (error) {
        alert(error)
    }
}

function handle_answer(alt) {
    const answer = localStorage.getItem('answer')

    if(alt === answer) {
        document.querySelector(`span#${alt}`).style.background = 'green'
        document.querySelector(`span#${alt}`).style.color = 'white'
    } else {
        document.querySelector(`span#${alt}`).style.background = 'red'
        document.querySelector(`span#${alt}`).style.color = 'white'
        
        document.querySelector(`span#${answer}`).style.background = 'green'
        document.querySelector(`span#${answer}`).style.color = 'white'
    }
}

function get_total() {
    try {
        api.get('/total').then(response => {
            localStorage.setItem('total_questions', Number(response.data.total_perguntas))
        })
    } catch (error) {
        alert(error)
    }
}