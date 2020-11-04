"use strict";

function slideNavBar(){
     const burgerButton = document.querySelector('.burger-button');
     const sideBarMenu = document.querySelector('.top-navlinks');
     const navLinks = document.querySelectorAll('.top-navlinks > li');
     const bodyTag = document.querySelector('body');

     burgerButton.addEventListener('click', () => {
          // Avoid scrolling the page while sidebar is open
          bodyTag.classList.toggle('overflow-hidden');

          // Toggle sidebar Menu
          sideBarMenu.classList.toggle('sidebarmenu-show');

          // Sidebar links
          navLinks.forEach( (link, i) => {
               if(link.style.animation)
                    link.style.animation = '';
               else link.style.animation = 'topNavLinksSlide 0.5s ease-out forwards ' + (i/7 + 0.4)+'s';
          });
     });
}

slideNavBar();