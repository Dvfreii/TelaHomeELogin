document.addEventListener('DOMContentLoaded', function () {
    const pwd1 = document.getElementById("pass1");
    const showPasswordBtn = document.getElementById("showPasswordBtn");

    showPasswordBtn.addEventListener('click', function () {
        if (pwd1.type === "password") {
            pwd1.type = "text";
        } else {
            pwd1.type = "password";
        }
    });

});
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