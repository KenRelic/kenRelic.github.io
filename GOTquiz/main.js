//GLOBAL VARIABLES
const play_btn = document.getElementById('play-btn');
let game_section = document.getElementById('game-section');
const next_question_btn = document.getElementById('next-question-btn');
let score_modal = document.getElementById('score-notification');
let home_page = document.getElementById('home-page');

let question_number = document.querySelector('#question-section header');
let question = document.querySelector('#question-section p:nth-of-type(1)');
let score = document.querySelector('#score p:nth-of-type(2)');
let options = document.querySelectorAll('#options p');
let gifs = {
    0: ['url(./media/gotnightking.jpeg)', 'Oh Snap', 'The night king is upon us'],
    1: ['url(./media/gotnightking.jpeg)', 'Oh snap', 'The night king is upon us'],
    2: ['url(./media/jeoffreyclaps.gif)', 'WOW', 'King Jeoffrey is impressed'],
    3: ['url(./media/jeoffreyclaps.gif)', 'WOW', 'You made king Jeoffrey clap hard'],
    4: ['url(./media/kotn.gif)', 'Hail Hail', 'You are the King in the North'],
    5: ['url(./media/ironthrone.jpeg)', 'Hail Hail', 'The one true king']
};
let home_btn = document.getElementById('home-btn');
let play_again_btn = document.getElementById('play-again-btn');

//data structure
const question_bank = [
    {
        question: "\"The man who passes the sentence should swing the sword.\" Who made this statement.",
        false_options: ['Jon Snow', 'Petyr Baelish', 'Jaime Lannister'],
        answer: 'Eddard Stark'
    },
    {
        question: "\"Winter is coming.\" Who was the first to make this statement.",
        false_options: ['Jon Snow', 'Bran Stark', 'Three-Eyed Raven'],
        answer: 'Eddard Stark'
    },
    {
        question: "\"When you play the game of thrones; you win or die.\" Who made this statement.",
        false_options: ['Daenerys Targaryen', 'Arya Stark', 'Sandor Clegane'],
        answer: 'Cersei Lannister'
    },
    {
        question: "\"It is beautiful beneath the sea, but if you stay too long; you'll drown.\" Who made this statement.",
        false_options: ['Joriah Mormont', 'Lord Varys', 'Stannis Baratheon'],
        answer: 'Three-Eyed Raven'
    },
    {
        question: "Which of these is not a house in the Game of Thrones?",
        false_options: ['House Baratheon', 'House Tygaryen', 'House Martell'],
        answer: 'House Braavos'
    },
];
let questions = [...question_bank];
let index = Math.floor(Math.random() * questions.length);
let number = 1;
let player_score = 0;

play_btn.addEventListener('click', load_game_section);
next_question_btn.addEventListener('click', load_question);
home_btn.addEventListener('click', go_home);
play_again_btn.addEventListener('click', play_quiz_again);

options.forEach(option => option.addEventListener('click', check_answer));

function load_game_section() {
    got_theme_song().volume(0.2);
    game_section.style.top = game_section.style.top == '0' ? '101%'
        : '0';
    score_modal.style.transform = 'scale(0)'
};

function go_home() {
    got_theme_song().volume(0.4);
    score_modal.style.transform = 'scale(0)';
    game_section.style.top = '101%';
    // play_quiz_again();
}

function play_quiz_again() {
    score_modal.style.transform = 'scale(0)';
    // load_question()
    // load_game_section();
}

function load_question() {
    // display question number and question
    question_number.innerHTML = `Question ${number} of 5`;
    question.innerHTML = questions[index].question;
    let question_options = [...questions[index].false_options];

    let answer = questions[index].answer;
    //choose a position for the correct answer
    let answer_index = Math.floor(Math.random() * 4);
    question_options.splice(answer_index, 0, answer);
    //update the DOM with the correct answer

    //fill the DOM with them
    for (let i = 0; i < options.length; i += 1) {
        options[i].childNodes[1].replaceWith(' ' + question_options[i]);
    };

    options.forEach(option => {
        option.style = 'pointer-events:initial; background-color:#09a2cc; color: #000';
    });
};

function check_answer(e) {
    if (e.target.tagName == 'P') {
        //change the background color if wrong or correct
        if ((e.target.childNodes[1].data).trim() == questions[index].answer) {
            e.target.style = 'background-color :green; color:#fff'
        } else {
            e.target.style = 'background-color :red; color:#fff';
            let options = document.querySelectorAll('#options p');
            options.forEach(option => {
                if (option.lastChild.data.trim() == questions[index].answer) {
                    setTimeout(() => {
                        option.style = 'background-color :green; color:#fff';
                    }, 200)
                }
            });

        }

        //update score if selected option is correct
        (e.target.childNodes[1].data).trim() == questions[index].answer ? score.innerHTML = player_score += 10 : '';
        //Prevent clicking after option have been clicked
        options.forEach(option => option.style.pointerEvents = 'none');
    };
    //remove the question from the question bank
    questions.splice(index, 1);
    //select another question from the question bank
    index = Math.floor(Math.random() * questions.length);
    //update the question number
    number < 5 ? number += 1 : display_score_modal();
}

window.onload = function () {
    score.innerHTML = player_score;
    load_question();

    //play GOT theme song
    got_theme_song().volume(0.4);
    got_theme_song().play();
    got_theme_song().loop();
}

function display_score_modal() {
    document.querySelector('#score-modal div:nth-of-type(1)').style.backgroundImage = gifs[player_score / 10][0];
    document.querySelector('#score-modal header').innerHTML = gifs[player_score / 10][1];
    document.querySelector('#score-modal p:nth-of-type(1)').innerHTML = gifs[player_score / 10][2];
    document.querySelector('#score-modal p:nth-of-type(2)').innerHTML = `You got ${player_score / 10} question(s) correct out of 5 and your score is ${player_score}`
    //number of star
    let stars = '';
    for (let i = 0; i < player_score / 10; i += 1) {
        stars += '&starf;'
    }
    document.querySelector('#score-modal div:nth-of-type(2)').innerHTML = stars;
    score_modal.style.transform = 'scale(1)';
    
    //reset the questions
    questions = question_bank;
    number = 1;
    player_score = 0;
    index = Math.floor(Math.random() * questions.length);
    console.log(questions,index);
    score.innerHTML = player_score;
    question_number.innerHTML = `Question ${number} of 5`;
    question.innerHTML = questions[index].question;
    options.forEach(option => {
        option.style = 'pointer-events:initial; background-color:#09a2cc; color: #000';
    });
}

function got_theme_song() {
    let audio = document.getElementById('got-theme-song');
    // audio.volume = 0.2;
    return {
        play: () => audio.play(),
        pause: () => audio.pause(),
        loop: () => {
            audio.onended = () => {
                audio.play();
            }
        },
        volume: (vol) => audio.volume = vol,
        reload: () => audio.currentTime = 0
    }
}

let speaker = document.getElementById('speaker');
speaker.addEventListener('click', sound_control);
function sound_control() {
    if (speaker.innerHTML == '🔇') {
        speaker.innerHTML = '🔊';
        got_theme_song().pause();
    } else {
        speaker.innerHTML = '🔇';
        game_section.style.top == '0' ? got_theme_song().volume(0.2) : got_theme_song().volume(0.4)
        got_theme_song().play()
        got_theme_song().reload();
    };
}

// progress bar code
let progress_bar = document.getElementById('quiz-progress');
