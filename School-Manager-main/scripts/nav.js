
document.addEventListener('DOMContentLoaded', function () {
    const menuLateral = document.querySelector('.menu-lateral');
    const logoNav = document.getElementById('logo-nav');

    menuLateral.addEventListener('mouseover', function () {
        logoNav.classList.add('hovered');
    });

    menuLateral.addEventListener('mouseout', function () {
        logoNav.classList.remove('hovered');
    });
});
