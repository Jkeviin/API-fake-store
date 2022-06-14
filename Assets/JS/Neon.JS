const image = document.getElementById('image-about');

window.onload = aclarar();

function aclarar(){
    image.style.filter = 'brightness(0%)';
    setTimeout(oscurecer, 800);
    
}

function oscurecer() {
    image.style.filter = 'brightness(100%)';
    setTimeout(aclarar, 1200);
}