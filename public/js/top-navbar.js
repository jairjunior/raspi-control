"use strict";

function slideNavBar(){
     const burgerButton = document.querySelector('.burger-button');
     const sideBarMenu = document.querySelector('.top-navlinks');
     const links = document.querySelectorAll('.top-navlinks > li');
     const bodyTag = document.querySelector('body');

     burgerButton.addEventListener('click', () => {
          // Avoid scrolling the page when sidebar is visible (open)
          bodyTag.classList.toggle('overflow-hidden');
          // Toggle sidebar Menu
          sideBarMenu.classList.toggle('sidebarmenu-show');
          // Control sidebar links animation (keyframe)
          links.forEach( (link, i) => {
               if(link.style.animation)
                    link.style.animation = '';
               else link.style.animation = 'topNavLinksSlide 0.5s ease-out forwards ' + (i/7 + 0.4)+'s';
          });
     });
}

slideNavBar();