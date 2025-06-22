// Constants for display styles
const DISPLAY_BLOCK = 'block';
const DISPLAY_NONE = 'none';

// Function to determine the data file based on the language
function getDataFile(lang) {
    return lang === 'english' ? 'data.json' : 'data_ar.json';
}

// Function to fetch data from data.json and display it in cards
async function displayDataInCards(lang) {
    try {
        // Store the selected language in localStorage
        localStorage.setItem('lang', lang);

        // Fetch data from data.json
        const response = await fetch(getDataFile(lang));
        const data = await response.json();

        // Get the container where cards will be added
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';

        // Loop through the data and create cards
        data.forEach(item => {
            // Create a card element
            const card = document.createElement('div');
            card.className = 'card';
            // Add content to the card
            card.innerHTML = `
                <div class="card-header">
                    <img src="${item.logo}" alt="${item.name}">
                    <div class="card-text">
                        <h3>${item.name}</h3>
                        <div class="details dark-mode">${item.description}</div>
                    </div>
                </div>
                <div class="actions">
                    <button class="remove-btn dark-mode">Remove</button>
                    <label class="switch">
                        <input type="checkbox" ${item.isActive === true ? 'checked' : ''} />
                        <span class="slider"></span>
                    </label>
                </div>
            `;

            // Append the card to the container
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error occurred while fetching data or rendering cards. Details:', error);
    }
}

// Call the function to display data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const arabic = document.querySelector('.arabic');
    const english = document.querySelector('.english');
    const sunIcon = document.querySelector('.svg-sun-dark');
    const moonIcon = document.querySelector('.svg-moon-light');
    const body = document.body;
    const lang = localStorage.getItem('lang') || 'english';
    const langText = document.querySelector('.lang-text');
    // check if there is lang-activated class make it the other class in the list
    if (lang === 'english') {
        langText.textContent = 'Ar';
        // arabic.style.display = 'none';
        // english.style.display = 'block';
    } else {
        langText.textContent = 'En';
        // arabic.style.display = 'block';
        // english.style.display = 'none';
    }

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
    else {
        body.classList.remove('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    // Default to English if no language is set
    displayDataInCards(lang)
});



// Function to remove a card when the remove button is clicked
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const card = event.target.closest('.card');
        if (card) {
            card.remove();
        }
    }
    // condition to switch between languages
    if (event.target.classList.contains('lang-text')) {
        if (event.target.textContent === 'En') {
            event.target.textContent = 'Ar';
            displayDataInCards('english');
        } else {
            event.target.textContent = 'En';
            displayDataInCards('arabic');
        }
    }
});


// function to filter if it's active or inactive or all
function filterCards(status) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        const isAll = status === 'all';
        const active = status === 'active';
        const inactive = status === 'inactive';
        if (isAll || active && checkbox.checked || inactive && !checkbox.checked) {
            card.style.display = DISPLAY_BLOCK;
        } else {
            card.style.display = DISPLAY_NONE;
        }
    });
}

// Iterate over buttons and add event listeners
document.querySelectorAll('.filter-btns .choices .btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'activated' class from all buttons
        document.querySelectorAll('.filter-btns .choices .btn').forEach(btn => btn.classList.remove('activated'));
        
        // Add 'activated' class to the clicked button
        button.classList.add('activated');
        
        // Get the status from the clicked button and filter cards
        const status = button.getAttribute('data-status');
        filterCards(status);
    });
});

// function to switch btween light and dark mode
function toggleTheme() {
    const body = document.body;
    const sunIcon = document.querySelector('.svg-sun-dark');
    const moonIcon = document.querySelector('.svg-moon-light');
    
    body.classList.toggle('dark-mode');

    sunIcon.style.display = body.classList.contains('dark-mode') ? 'block' : 'none';
    moonIcon.style.display = body.classList.contains('dark-mode') ? 'none' : 'block';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Add event listener for theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);