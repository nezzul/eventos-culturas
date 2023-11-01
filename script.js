window.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://raw.githubusercontent.com/nezzul/eventos-culturas/main/datos.json')
        .then(response => response.json())
        .then(data => {

            // Crea nuevo objeto para "hoy"
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            // Filtra los datos
            data = data.filter(item => new Date(item.fecha) >= hoy);

            // Ordena los datos por fecha
            data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

            //HTML GALERÍA
            const targetModal  = document.querySelector('.js-modal-show-target')
            const galeria = document.getElementById('galeria');
            const modal = document.querySelector('.js-modal-content-target');
            const modalClose = document.querySelector('.js-modal-close');
            const fragmentCards = document.createDocumentFragment();
            const fragmentModal = document.createDocumentFragment();

            modalClose.addEventListener('click', function() {
                targetModal.classList.remove('js-modal-show')
            })

            data.forEach(item => {
                const templateStringCard = `
                    <div data-key="" class="card js-show-modal-trigger">
                        <h2 class="fechaInicio">${item.fechaInicio}</h2>
                        <h3 class="categoria">${item.categoria}</h3>
                        <h2 class="titulo">${item.titulo}</h2>
                        <img src="${item.imagen}" alt="${item.alt}">
                        <p class="hora">${item.hora}</p><p class="entrada">${item.entrada}</p>
                        <h4 class="organizador">${item.organizador}</h4>
                    </div>
                `;

                const templateStringModal = `
                    <div class="modal__content--modal ">
                        <h2 class="fechaInicio">${item.fechaInicio}</h2>
                        <h4 class="categoria">${item.categoria}</h4>
                        <h2 class="titulo">${item.titulo}</h2>
                        <img src="${item.imagen}" alt="${item.alt}">
                        <p>${item.descripcion}</p>
                        <p class="hora">📅  ${item.fechaExpo} ${item.fechaInicio}, ${item.hora}</p><p class="entrada">🎫  ${item.entrada}</p><p class="lugar">📍 ${item.lugar}</p>                 
                        <p>+ Info:  <a href="${item.enlace}" target="_blank">${item.enlace}</a></p>
                        <br><br>
                        <h3 class="organizador">${item.organizador}</h3>
                    </div>
                `;

                const parser = new DOMParser();
                const parsedHtml = parser.parseFromString(templateStringCard, 'text/html');
                const card = parsedHtml.body.firstChild;
                
                card.addEventListener('click', function(trigger, target){
                    const parser = new DOMParser();
                    const parsedHtml = parser.parseFromString(templateStringModal, 'text/html');
                    const modalContent = parsedHtml.body.firstChild;

                    fragmentModal.appendChild(modalContent);
                    modal.innerHTML = '';
                    targetModal.classList.add('js-modal-show')
                    modal.appendChild(fragmentModal);
                })

                fragmentCards.appendChild(card);
            });

            galeria.appendChild(fragmentCards);
        });
});
