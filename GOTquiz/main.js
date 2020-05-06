//GLOBAL VARIABLES
const play_btn = document.getElementById('play-btn');
let game_section = document.getElementById('game-section');
const next_question_btn = document.getElementById('next-question-btn');
let score_modal = document.getElementById('score-notification');
let home_page = document.getElementById('home-page');
let get_score_btn = document.getElementById('display-score-btn');

let question_number = document.querySelector('#question-section header');
let question = document.querySelector('#question-section p:nth-of-type(1)');
let score = document.querySelector('#score p:nth-of-type(2)');
let options = document.querySelectorAll('#options p');
let gifs = {
    0: ['url(./media/gotnightking.jpeg)', 'Oh Snap', 'The night king is upon us'],
    1: ['url(./media/gotnightking.jpeg)', 'Oh snap', 'The night king is upon us'],
    2: ['url(./media/jeoffreyclaps-min.gif)', 'WOW', 'King Jeoffrey is impressed'],
    3: ['url(./media/jeoffreyclaps-min.gif)', 'WOW', 'You made king Jeoffrey clap hard'],
    4: ['url(./media/kotn-min.gif)', 'Hail Hail', 'You are the King in the North'],
    5: ['url(./media/ironthrone.jpeg)', 'Hail Hail', 'The one true king']
};
let home_btn = document.getElementById('home-btn');
let play_again_btn = document.getElementById('play-again-btn');

//////DATA AND RESOURCES////////////////////////////////////////////////////////////////////////
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
    {
        question: "\"I may be small. I may be a girl, but i won't be knitting by the fire while i have men fight for me. \" Who made this statement.",
        false_options: ['Arya Stark', 'Daenerys Targaryen', 'Sansa Stark'],
        answer: 'Lyanna Mormont'
    },
    {
        question: "What was Missandei's last words?",
        false_options: ['Valar morghulis', 'Valar dohaeris', 'What is dead may never die'],
        answer: 'Dracarys'
    },
    {
        question: "Valar Morghulis...",
        false_options: ['jaqen H\'ghar', 'morghulis a valar', 'Dracarys'],
        answer: 'Valar dohaeris'
    },
    {
        question: "Who is Jaqen H\'ghar?",
        false_options: ['A member of the house of Greyjoy', 'The three-Eyed Raven', 'A member of the house of Bolton'],
        answer: 'A faceless men of Braavos'
    },
    {
        question: "What is dead may never die...",
        false_options: ['But enters the gates of Vahalla', 'But returns to life a king', 'But is dead forever'],
        answer: 'But rises again, harder and stronger'
    },
];
let psuedo_question_bank = [...question_bank];
let question_of_5 = [];

generate_question();

let questions = [...question_of_5];
//random question index to be selected/////////
let index = Math.floor(Math.random() * questions.length);
//question number
let number = 1;
let player_score = 0;

play_btn.addEventListener('click', load_game_section);
next_question_btn.addEventListener('click', next_question);
home_btn.addEventListener('click', go_home);
play_again_btn.addEventListener('click', play_quiz_again);
get_score_btn.addEventListener('click', get_score);
//// add the check answer function to every options /////////////////////////////////////
options.forEach(option => option.addEventListener('click', check_answer));

//// Pause theme song when the window is not in focus
window.addEventListener('blur', function () {
    got_theme_song().pause();
    speaker.innerHTML = '🔊'
}, false);
//// play theme song when the window is in focus
window.addEventListener('focus', function () {
}, false);

document.body.onload = function () {
    score.innerHTML = player_score;
    generate_question();
    load_question();
};

function load_game_section() {
    document.getElementById('footer').style.display = 'none';
    got_theme_song().volume(0.2);
    game_section.style.left = game_section.style.left == '0' ? '101vw'
        : '0';
    score_modal.style.transform = 'scale(0)';
    score_modal.style.opacity = '0';
};

/////// GO HOME CODE/////////////////////////////////////////////////////////////////////////////////
function go_home() {
    got_theme_song().volume(0.4);
    next_question_btn.style.display = 'flex';
    get_score_btn.style.display = 'none';
    score_modal.style.transform = 'scale(0)';
    score_modal.style.opacity = '0';
    game_section.style.left = '101vw';
    document.getElementById('footer').style.display = 'block';
};

////// PLAY QUIZ AGAN CODE/////////////////////////////////////////////////////////////////////////
function play_quiz_again() {
    document.getElementById('footer').style.display = 'none';
    score_modal.style.transform = 'scale(0)';
    score_modal.style.opacity = '0';
    get_score_btn.style.display = 'none';
    next_question_btn.style.display = 'flex';
    //clear the progress bar ////////////////
    let progress_bar = document.querySelectorAll('#quiz-progress div');
    progress_bar.forEach(bar => bar.style.display = 'none')
    load_progress_bar();

};

/////CREATE A QUESTION BANK OF 5 QUESTIONS FROM THE QUIZ BANK/////////////////////////////////////////
function generate_question() {
    for (let i = 0; i < 5; i += 1) {
        let psuedo_index = Math.floor(Math.random() * psuedo_question_bank.length);
        question_of_5.push(...psuedo_question_bank.splice(psuedo_index, 1));
    };
};
/////////// DISPLAY THE GENERATED QUESTION ///////////////////////////////////////////////////////////////////
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

    load_progress_bar()
    options.forEach(option => {
        option.style = 'pointer-events:initial; background-color:#09a2cc; color: #000';
    });
    if(number == 5){
        next_question_btn.style.display = 'none';
        get_score_btn.style.display = 'flex';
    }
};

//////////////CHECK IF SELECTED OPTION IS CORRECT OR NOT ////////////////////////////////////////////////////////////
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
        };
        //update score if selected option is correct
        (e.target.childNodes[1].data).trim() == questions[index].answer ? score.innerHTML = player_score += 10 : '';
        //Prevent clicking after option have been clicked
        options.forEach(option => option.style.pointerEvents = 'none');
    };
};

/////////////// GENERATE THE NEXT QUESTION TO BE DISPLAYED////////////////////////////////////////////
function next_question() {
    //remove the question from the question bank
    questions.splice(index, 1);
    //select another question from the question bank
    index = Math.floor(Math.random() * questions.length);
    //update the question number
    if (number < 5) {
        number += 1;
        load_question()
    } else {
        options.forEach(option => option.style.pointerEvents = 'none');
    }
};

//SCORE MODAL CODE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function display_score_modal() {
    document.querySelector('#score-modal div:nth-of-type(1)').style.backgroundImage = gifs[player_score / 10][0];
    document.querySelector('#score-modal header').innerHTML = gifs[player_score / 10][1];
    document.querySelector('#score-modal p:nth-of-type(1)').innerHTML = gifs[player_score / 10][2];
    document.querySelector('#score-modal p:nth-of-type(2)').innerHTML = `You got ${player_score / 10} question(s) correct out of 5 and your score is ${player_score}`

    //number of star AS DECIDED BY THE NUMBER OF CORRECT QUESTIONS ANSWERED.
    let stars = '';
    for (let i = 0; i < player_score / 10; i += 1) {
        stars += '&starf;'
    }
    //DISPLAY STARS
    document.querySelector('#score-modal div:nth-of-type(2)').innerHTML = stars;
    score_modal.style.opacity = '1';
    score_modal.style.transform = 'scale(1)';

    //reset the question bank//////////
    questions = [...question_bank];
    number = 1;
    player_score = 0;
    index = Math.floor(Math.random() * questions.length);
    score.innerHTML = player_score;
    let options = document.querySelectorAll('#options p');
    //change the color of the options and make them clickable///////////////////
    options.forEach(option => {
        option.style = 'pointer-events:initial; background-color:#09a2cc; color: #000';
    });
    load_progress_bar();
    load_question();
};
///////////// RESET PROGRESS BAR AND DISPLAY THE SCORE NOTIFICATION AREA VIA THE SCORE MODAL/////////////
function get_score() {
    load_progress_bar()
    display_score_modal();
}
/////////////////THEME SONG CODE/////////////////////////////////////////////////////////////////////////
let speaker = document.getElementById('speaker');
speaker.addEventListener('click', sound_control);
function sound_control() {
    if (speaker.innerHTML == '🔊') {
        speaker.innerHTML = '🔇';
        got_theme_song().reload();
        got_theme_song().play();
    } else {
        speaker.innerHTML = '🔊';
        got_theme_song().pause();
        game_section.style.top == '0' ? got_theme_song().volume(0.2) : got_theme_song().volume(0.4);
    };
}
function got_theme_song() {
    let audio = document.getElementById('got-theme-song');
    audio.volume = 0.4;
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
    };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PROGRESS BAR CODE ////////////////////////////////////////////////////////////////////////////////////////////
function load_progress_bar() {
    let progress_bar = document.querySelectorAll('#quiz-progress div');
    if (number <= 5) {
        for (let i = 0; i < number; i += 1) {
            progress_bar[i].style.display = 'block';
        }
    } else {
        progress_bar.forEach(bar => bar.style.display = 'none')
    };
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////













