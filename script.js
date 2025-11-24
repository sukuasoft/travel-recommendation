// Load travel data
let travelData = {};

// Fetch the JSON data
fetch('travel1.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log('Travel data loaded successfully');
    })
    .catch(error => {
        console.error('Error loading travel data:', error);
    });

// Search functionality
document.getElementById('searchBtn').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayMessage('Por favor, digite um termo de busca.');
        return;
    }

    const results = [];

    // Search in countries
    if (travelData.countries) {
        travelData.countries.forEach(country => {
            // Check if country name matches
            if (country.name.toLowerCase().includes(searchTerm) || 
                searchTerm.includes(country.name.toLowerCase()) ||
                matchKeyword(searchTerm, ['country', 'countries', 'pais', 'paises'])) {
                
                country.cities.forEach(city => {
                    results.push({
                        type: 'country',
                        title: city.name,
                        description: city.description,
                        imageUrl: city.imageUrl,
                        icon: 'fa-flag'
                    });
                });
            } else {
                // Check cities
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchTerm)) {
                        results.push({
                            type: 'country',
                            title: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl,
                            icon: 'fa-flag'
                        });
                    }
                });
            }
        });
    }

    // Search in temples
    if (travelData.temples) {
        if (matchKeyword(searchTerm, ['temple', 'temples', 'templo', 'templos'])) {
            travelData.temples.forEach(temple => {
                results.push({
                    type: 'temple',
                    title: temple.name,
                    description: temple.description,
                    imageUrl: temple.imageUrl,
                    icon: 'fa-torii-gate'
                });
            });
        } else {
            travelData.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(searchTerm)) {
                    results.push({
                        type: 'temple',
                        title: temple.name,
                        description: temple.description,
                        imageUrl: temple.imageUrl,
                        icon: 'fa-torii-gate'
                    });
                }
            });
        }
    }

    // Search in beaches
    if (travelData.beaches) {
        if (matchKeyword(searchTerm, ['beach', 'beaches', 'praia', 'praias'])) {
            travelData.beaches.forEach(beach => {
                results.push({
                    type: 'beach',
                    title: beach.name,
                    description: beach.description,
                    imageUrl: beach.imageUrl,
                    icon: 'fa-umbrella-beach'
                });
            });
        } else {
            travelData.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(searchTerm)) {
                    results.push({
                        type: 'beach',
                        title: beach.name,
                        description: beach.description,
                        imageUrl: beach.imageUrl,
                        icon: 'fa-umbrella-beach'
                    });
                }
            });
        }
    }

    displayResults(results);
}

function matchKeyword(searchTerm, keywords) {
    return keywords.some(keyword => searchTerm.includes(keyword));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Nenhum resultado encontrado. Tente buscar por países, praias ou templos.</div>';
        return;
    }

    resultsContainer.innerHTML = results.map(result => `
        <div class="result-card">
            <div class="result-image">
                <i class="fas ${result.icon}"></i>
            </div>
            <div class="result-content">
                <h3>${result.title}</h3>
                <p>${result.description}</p>
                <span class="result-badge">${capitalizeFirst(result.type)}</span>
            </div>
        </div>
    `).join('');

    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function displayMessage(message) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `<div class="no-results">${message}</div>`;
}

function capitalizeFirst(str) {
    const translations = {
        'country': 'País',
        'temple': 'Templo',
        'beach': 'Praia'
    };
    return translations[str] || str.charAt(0).toUpperCase() + str.slice(1);
}

// Clear button functionality
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultsContainer').innerHTML = '';
});

// Category buttons functionality
document.querySelectorAll('.btn-category').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        displayCategory(category);
    });
});

function displayCategory(category) {
    const results = [];

    switch(category) {
        case 'countries':
            if (travelData.countries) {
                travelData.countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.push({
                            type: 'country',
                            title: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl,
                            icon: 'fa-flag'
                        });
                    });
                });
            }
            break;
        
        case 'temples':
            if (travelData.temples) {
                travelData.temples.forEach(temple => {
                    results.push({
                        type: 'temple',
                        title: temple.name,
                        description: temple.description,
                        imageUrl: temple.imageUrl,
                        icon: 'fa-torii-gate'
                    });
                });
            }
            break;
        
        case 'beaches':
            if (travelData.beaches) {
                travelData.beaches.forEach(beach => {
                    results.push({
                        type: 'beach',
                        title: beach.name,
                        description: beach.description,
                        imageUrl: beach.imageUrl,
                        icon: 'fa-umbrella-beach'
                    });
                });
            }
            break;
    }

    displayResults(results);
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // In a real application, you would send this data to a server
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve através do email ${email}.`);
    
    // Clear form
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
