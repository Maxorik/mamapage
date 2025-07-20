fetch('./projects.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('project-container');

        let lastyear = 3000;

        data["store"].forEach(project => {
            if (+project['year'] < lastyear) {
                lastyear = +project['year'];
                const yearContainer = document.createElement('div');
                yearContainer.id = `year${project['year']}`;
                yearContainer.className = 'year-container';
                yearContainer.innerHTML = `
                            <h3 class="year-title">${project['year']}</h3>
                            <div class="year-project-container"></div>
                        `;
                container.appendChild(yearContainer);
            }

            const projectUrl = project['site'] || project['github'];

            const card = document.createElement('div');
            const parent = document.getElementById(`year${project['year']}`).querySelector('.year-project-container');

            card.className = 'card';
            card.innerHTML = `
                        <img class="project-icon" alt="project" src="assets/${project['image']}">
                        <h3 class="project-title">${project['title']}</h3>
                        <p>${project['description']}</p>
                        <a href='${projectUrl}' class="project-site" target="_blank">${project['link']}</a>
                    `;

            parent.appendChild(card);
        });

    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));