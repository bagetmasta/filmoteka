const shadow = document.querySelector('.shadow-background');
document.body.style.overflow = 'hidden';

function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
}
  
function shadowOf() {
  shadow.classList.add('set-timeout');
  document.body.style.overflow = 'visible';
}

backToTop() 
setTimeout(shadowOf, 4000);
