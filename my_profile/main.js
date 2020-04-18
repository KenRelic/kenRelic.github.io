window.onload = () => {
    let create_message_btn = document.querySelector('#contact-user >button');
    let contact_form = document.getElementById('contact-form');
    contact_form.style.bottom = '-105vh';
    create_message_btn.addEventListener('click', () => {
        if (contact_form.style.bottom == '-105vh') {
            contact_form.style.bottom = '0';
        } else {
            contact_form.style.bottom = '-105vh';
        }
    });

    let close_btn = document.getElementById('close-btn');
    close_btn.addEventListener('click', () => {
        contact_form.style.bottom = '-105vh';
    })
}

