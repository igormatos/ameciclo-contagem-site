
// require('normalize.css/normalize.css');
// require('./styles/index.scss');

// import './styles/index.scss';

document.addEventListener("DOMContentLoaded", () => {

  /*   const pluginsTriggerElement = document.getElementById('plugins-trigger');
    const pluginsElement = document.getElementById('plugins');

    const pluginsVisibleClass = "splash-overview-plugins__list--visible";

    pluginsTriggerElement.onclick = () => {
        pluginsElement.classList.toggle(pluginsVisibleClass);
    } */

    const menu = document.querySelector('.menu');
    const menu_container = document.querySelector('.menu-fullscreen');
    const body = document.querySelector('body');
    
    menu.addEventListener('click', function() {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            menu.classList.add('close');
            menu_container.classList.add('hidden');
            body.classList.remove('overflow-y-disabled');
        } else {
            menu.classList.remove('close');
            menu.classList.add('open');
            menu_container.classList.remove('hidden');
            body.classList.add('overflow-y-disabled');
        }
    });


});
