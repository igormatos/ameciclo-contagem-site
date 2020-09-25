
require('normalize.css/normalize.css');
import './styles/index.scss';
require("./assets/js/maps.js")
import BikeAnjoLogo from './assets/images/bike-anjo-logo.png'
import AmecicloLogo from './assets/images/ameciclo-logo.png'

document.addEventListener("DOMContentLoaded", () => {

    /*   const pluginsTriggerElement = document.getElementById('plugins-trigger');
      const pluginsElement = document.getElementById('plugins');
  
      const pluginsVisibleClass = "splash-overview-plugins__list--visible";
  
      pluginsTriggerElement.onclick = () => {
          pluginsElement.classList.toggle(pluginsVisibleClass);
      } */

    // const menu = document.querySelector('.menu');
    // const menu_container = document.querySelector('.menu-fullscreen');
    // const body = document.querySelector('body');

    // menu.addEventListener('click', function () {
    //     if (menu.classList.contains('open')) {
    //         menu.classList.remove('open');
    //         menu.classList.add('close');
    //         menu_container.classList.add('hidden');
    //         body.classList.remove('overflow-y-disabled');
    //     } else {
    //         menu.classList.remove('close');
    //         menu.classList.add('open');
    //         menu_container.classList.remove('hidden');
    //         body.classList.add('overflow-y-disabled');
    //     }
    // });


    const bikeAnjoLogo = new Image();
    bikeAnjoLogo.width = 150;
    bikeAnjoLogo.height = 150;
    bikeAnjoLogo.src = BikeAnjoLogo;
 
    document.getElementById("logo-bikeanjo").appendChild(bikeAnjoLogo);

    const amecicloLogo = new Image();
    amecicloLogo.width = 150;
    amecicloLogo.height = 150;
    amecicloLogo.src = AmecicloLogo;
 
    document.getElementById("logo-ameciclo").appendChild(amecicloLogo);
    

});
