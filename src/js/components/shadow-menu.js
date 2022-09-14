const shadow = document.querySelector('.shadow-background');
document.body.style.overflow = 'hidden';

function shadowOf() {
  shadow.classList.add('set-timeout');
  document.body.style.overflow = 'visible';
}

// backToTop();
setTimeout(shadowOf, 4000);
