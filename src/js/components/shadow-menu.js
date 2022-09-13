const shadow = document.querySelector('.shadow-background');
document.body.style.overflow = 'hidden';

function shadowOf() {
    console.log(shadow)
    shadow.classList.add('set-timeout');
    document.body.style.overflow = 'visible';
};

setTimeout(shadowOf, 3000);