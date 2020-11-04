"use strict";

function slideNavBar(){
     const burgerButton = document.querySelector('.burger-button');
     const sideBarMenu = document.querySelector('.top-navlinks');
     const navLinks = document.querySelectorAll('#top-navlinks > li');

     burgerButton.addEventListener('click', () => {
          sideBarMenu.classList.toggle('sidebarmenu-show');
          console.log('Click on burger!');
     });
}

slideNavBar();