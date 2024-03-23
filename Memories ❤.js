let inputDiv = document.querySelector('.inputDiv');
let input = document.querySelector('.input');
let uploadLabel = document.getElementById('upload');
let container = document.querySelector('.container');

let c1 = document.querySelector('.c1');
let c2 = document.querySelector('.c2');

let createBtn = document.querySelector('.create');
let goToBottom = document.querySelector('.goToBottom');

let i = 4;

let mood = 'down';


goToBottom.onclick = function () {

    if (mood === 'down') {
        goToBottom.href = '#CM';
        goToBottom.innerHTML = '↑';
        mood = 'up';

    } else if (mood === 'up') {
        goToBottom.href = '#';
        goToBottom.innerHTML = '↓'
        mood = 'down';
    }
};



window.onload = function () {
    let savedDivs = localStorage.getItem('savedDivs');

    if (savedDivs) {
        savedDivs = JSON.parse(savedDivs);
        savedDivs.forEach((divData) => {
            createAndDisplayDiv(divData);
        });
    }

};


function createAndDisplayDiv(divData) {
    let div = document.createElement('div');
    let blurDiv = document.createElement('div');
    div.classList.add('card', `c${i}`);
    blurDiv.classList.add('blur');

    if (divData.imageUrl) {
        div.style.backgroundSize = 'cover';
        div.style.backgroundImage = `url('${divData.imageUrl}')`;
        div.setAttribute('data-image-url', divData.imageUrl);
        blurDiv.innerHTML = divData.content;
    } else {
        div.innerHTML = divData.content;
    }



    div.appendChild(blurDiv);
    container.appendChild(div);

};


document.addEventListener('click', function(event) {
    let clickedDiv = event.target.closest('.card');

    if (clickedDiv) {
        if (clickedDiv.dataset.imageUrl) {
            window.open(clickedDiv.dataset.imageUrl, '_blank');
        }
        // If the clicked div doesn't have a background image set via data attribute,
        // check if it's a manually created div with a background image set via CSS
        else {
            let computedStyle = window.getComputedStyle(clickedDiv);
            let backgroundImage = computedStyle.getPropertyValue('background-image');
            if (backgroundImage && backgroundImage !== 'none') {
                // Assuming the background image URL is wrapped in 'url()'
                let imageUrl = backgroundImage.slice(4, -1).replace(/["']/g, "");
                window.open(imageUrl, '_blank');
            }
        }
    }
});


// ============================= Creating Card Function =============================


function createCard() {
    let divContent = input.value;
    let uploadedImage = uploadLabel.files[0];
    
    if (divContent && uploadedImage) {

        let reader = new FileReader();

        reader.onload = function (e) {
            let imageUrl = e.target.result;
            let divData = {
                content: divContent,
                imageUrl: imageUrl,
            };

            createAndDisplayDiv(divData);
            
            let savedDivs = localStorage.getItem('savedDivs');
            savedDivs = savedDivs ? JSON.parse(savedDivs) : [];
            savedDivs.push(divData);
            localStorage.setItem('savedDivs', JSON.stringify(savedDivs));

        }

        reader.readAsDataURL(uploadedImage);
            
        } else {
            alert('Please Enter Date And Image ❤.');
        }

        input.value = '';
        uploadLabel.value = '';
            
}



// ================= Input Functions =================


function deleteLastDiv() {
    let savedDivs = JSON.parse(localStorage.getItem('savedDivs'));
    
    if (savedDivs && savedDivs.length > 0) {
        savedDivs.pop(); // Remove the last div object
        localStorage.setItem('savedDivs', JSON.stringify(savedDivs)); // Update local storage
        refreshDivs(savedDivs); // Refresh displayed divs
    }
}


function refreshDivs (savedDivs) {
    container.innerHTML = `<div class="card1">
    <p class="primTitle">The Greatest One</p>
    <p class="date">🤍 Friday 29 / 12 / 2023 🤍</p>
</div>

<div class="card c1">
    <div class="blur">
        <p class="secTitle">Sunday 21 / 1 / 2024</p>
    </div>
</div>

<div class="card c2">
    <div class="blur">
        <p class="secTitle">Sunday 10 / 3 / 2024</p>
    </div>
</div>

<div class="card c3">
    <div class="blur">
        <p class="secTitle">Friday 22 / 3 / 2024</p>
    </div>
</div>`;
    
    savedDivs.forEach( (divData) => {
        createAndDisplayDiv(divData);
    });
}

function focused () {
    inputDiv.style.opacity = '0';
    inputDiv.style.display = 'block';
    setTimeout(() => {
        inputDiv.style.opacity = '1';
    }, 10);
}

function blurred () {
    // inputDiv.style.display = 'none';
    inputDiv.style.opacity = '0';
    setTimeout(() => {
       inputDiv.style.display = 'none'; 
       setTimeout(() => {
        inputDiv.style.opacity = '1';
       }, 10);
    }, 300);
}