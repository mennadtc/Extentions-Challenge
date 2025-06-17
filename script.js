// Function to fetch data from data.json and display it in cards
async function displayDataInCards() {
    try {
        // Fetch data from data.json
        const response = await fetch('data.json');
        const data = await response.json();

        // Get the container where cards will be added
        const cardContainer = document.getElementById('card-container');

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
                        <div class="details">${item.description}</div>
                    </div>
                </div>
                <div class="actions">
                    <button class="remove-btn">Remove</button>
                    <label class="switch">
                        <input type="checkbox" ${item.isActive ? 'checked' : ''} />
                        <span class="slider"></span>
                    </label>
                </div>
            `;

            // Append the card to the container
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

// Call the function to display data when the page loads
document.addEventListener('DOMContentLoaded', displayDataInCards);

// Function to remove a card when the remove button is clicked
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const card = event.target.closest('.card');
        if (card) {
            card.remove();
        }
    }
});

// to discuss
// function to filter if it's active or inactive or all
function filterCards(status) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (status === 'all' || (status === 'active' && checkbox.checked) || (status === 'inactive' && !checkbox.checked)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listener for filter buttons
document.querySelectorAll('.filter-btns').forEach(button => {
    button.addEventListener('click', () => {
        const status = button.getAttribute('data-status');
        filterCards(status);
    });
});


// function to activate the filter btns