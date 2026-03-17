let animalsOnScreen = 0;
const counterElement = document.getElementById('counter-display');
const displayArea = document.getElementById('display-area');
// Used an object to keep track of image folder paths
const animalData = {
    cat: { img: 'images/tabby-cat.jpg' },
    dog: { img: 'images/dog.jpg' },
    cow: { img: 'images/cow.jpg' }
};

document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-animal');
        
        if (document.getElementById(`card-${type}`)) return;

        this.classList.add('active-btn');
        
        const card = document.createElement('div');
        card.id = `card-${type}`;
        card.className = 'animal-card';
        card.innerHTML = `
            <img src="${animalData[type].img}" alt="${type}" style="width:100%">
            <button class="hide-btn" onclick="hideAnimal('${type}')">Hide Result</button>
        `;
        displayArea.appendChild(card);

        animalsOnScreen++;
        updateCounter();
    });
});
// removes the animal card and changes the button style
function hideAnimal(type) {
    const card = document.getElementById(`card-${type}`);
    if (card) {
        card.remove();
        const revealBtn = document.querySelector(`.reveal-btn[data-animal="${type}"]`);
        revealBtn.classList.remove('active-btn');
        
        animalsOnScreen--;
        updateCounter();
    }
}
// clears the DOM and resets all button states
document.getElementById('reset-zoo').addEventListener('click', () => {
    displayArea.innerHTML = '';
    document.querySelectorAll('.reveal-btn').forEach(btn => btn.classList.remove('active-btn'));
    animalsOnScreen = 0;
    updateCounter();
});

function updateCounter() {
    counterElement.textContent = `Animals on screen: ${animalsOnScreen}`;
}
