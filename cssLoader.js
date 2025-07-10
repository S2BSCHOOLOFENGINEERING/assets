
window.addEventListener('load', function () {
    // Hide the loader
    document.querySelector('.loader-wrapper').style.display = 'none';

    // Show the content with a fade-in effect
    const content = document.querySelector('.page-content');

    content.style.display = 'block';  
    setTimeout(() => {
        content.classList.add('show');  
    }, 1000); 
});