let send_message_btn = document.querySelector('#contact-user span:nth-of-type(2)');
let contact_form = document.getElementById('contact-form');
send_message_btn.addEventListener('click', () => {
    console.log(contact_form.style.bottom)
    if (contact_form.style.bottom == '-105vh') {
        contact_form.style.bottom = '0';
    } else {
        contact_form.style.bottom = '-105vh';
    }
});

let close_btn = document.getElementById('close-btn');
close_btn.addEventListener('click', ()=>{
    contact_form.style.bottom = '-105vh';
})