document.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Box 1 - TranslateX
    const box1 = document.getElementById('box1');
    if (scrollPosition + windowHeight > box1.offsetTop) {
        box1.style.transform = 'translateX(0)';
    }

    // Box 2 - TranslateY
    const box2 = document.getElementById('box2');
    if (scrollPosition + windowHeight > box2.offsetTop) {
        box2.style.transform = 'translateY(0)';
    }

    // Box 3 - TranslateZ
    const box3 = document.getElementById('box3');
    if (scrollPosition + windowHeight > box3.offsetTop) {
        box3.style.transform = 'translateZ(0)';
    }
});
console.log(true ==='true');
