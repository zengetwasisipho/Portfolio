let total = 0;
// Load data from LocalStorage on startup so it stays saved
let subscriptions = JSON.parse(localStorage.getItem('mySubs')) || [];

const addBtn = document.getElementById('add-btn');
const subList = document.getElementById('sub-list');
const totalDisplay = document.getElementById('total-amount');

// THIS IS THE RENDER APP FUNCTION
// Its job is to clear the list and redraw it every time data changes.
function renderApp() {
    subList.innerHTML = ''; // Clear the current list
    total = 0;              // Reset total to 0 before calculating

    subscriptions.forEach((sub, index) => {
        const li = document.createElement('li');
        li.className = 'sub-item';
        // Using R instead of $ here
        li.innerHTML = `
            <span>${sub.name}</span>
            <span>R${sub.cost.toFixed(2)} <button class="delete-btn" onclick="deleteSub(${index})">×</button></span>
        `;
        subList.appendChild(li);
        total += sub.cost;
    });

    // Update the big total at the top with R
    totalDisplay.innerText = `R${total.toFixed(2)}`;
    
    // Save the current list to the browser's memory
    localStorage.setItem('mySubs', JSON.stringify(subscriptions));
}

// Logic to add a new subscription
addBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('sub-name');
    const costInput = document.getElementById('sub-cost');
    const name = nameInput.value;
    const cost = parseFloat(costInput.value);

    if (name && !isNaN(cost)) {
        subscriptions.push({ name, cost });
        nameInput.value = '';
        costInput.value = '';
        renderApp(); // Call the function to redraw the UI
    }
});

// Logic to delete a subscription
window.deleteSub = (index) => {
    subscriptions.splice(index, 1); // Remove the item from the data array
    renderApp(); // Call the function to redraw the UI
};

// Run this once when the page first loads
renderApp();