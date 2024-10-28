let donations = [];
let infoLocations = [];
let collection = [];
let users={};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    

if (users[username]&&users[username] === password) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('homeSection').style.display = 'block';
    document.getElementById('welcomeText').innerText = `Hi, ${username}`;
} else {
    alert("Invalid username or password.");
}
}

function signUp() {
    const newUsername=document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
        if (users[newUsername]) {
            alert("Username already exists. Choose a different one.");
        } else {
            users[newUsername] = newPassword; 
            alert("Account created successfully!");
            showLogin(); 
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Show signup section
function showSignUp() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
}

// Show login section
function showLogin() {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
}

function showDonate() {
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('donateSection').style.display = 'block';
}

function showCollect() {
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('collectSection').style.display = 'block';
    displayCollectList();
}

function showInfo() {
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('infoSection').style.display = 'block';
    displayInfoList();
}

function navigateHome() {
    document.getElementById('donateSection').style.display = 'none';
    document.getElementById('collectSection').style.display = 'none';
    document.getElementById('infoSection').style.display = 'none';
    document.getElementById('homeSection').style.display = 'block';
}

function submitDonation() {
    const foodName = document.getElementById('foodName').value;
    const quantity = document.getElementById('quantity').value;
    const expiry = document.getElementById('expiry').value;
    const location = document.getElementById('location').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (foodName && quantity && expiry && location && imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const donation = {
                foodName,
                quantity,
                expiry,
                location,
                image: e.target.result // Use the base64 string of the image
            };
            donations.push(donation);
            displayDonationList();
            alert("Donation submitted successfully!");
            clearDonationForm();
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert("Please fill in all fields.");
    }
}

function displayDonationList() {
    const donationList = document.getElementById('donationList');
    donationList.innerHTML = '';
    donations.forEach((donation, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="donation-details">
            <img src="${donation.image}" alt="${donation.foodName}"class="donation-image">
             <div class="donation-info">    
                <strong >${donation.foodName}</strong>
                <p style="padding-right: 10px;">Quantity: ${donation.quantity}</p>
                <p  style="padding-right: 10px;">Expiry: ${donation.expiry}</p>
                <p  style="padding-right: 10px;">Location: ${donation.location}</p>
            </div>
            </div>
            <button onclick="deleteDonation(${index})"class="delete-button">Delete</button>
        `;
        donationList.appendChild(div);
    });
}

function deleteDonation(index) {
    donations.splice(index, 1);
    displayDonationList();
}

function displayCollectList() {
    const collectList = document.getElementById('collectList');
    collectList.innerHTML = '';
    donations.forEach((donation, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="donation-details">
            <img src="${donation.image}" alt="${donation.foodName}"class="donation-image">
             <div class="donation-info">    
                <strong>${donation.foodName}</strong>
                <p>Quantity: ${donation.quantity}</p>
                <p>Expiry: ${donation.expiry}</p>
                <p>Location: ${donation.location}</p>
            </div>
            <button onclick="confirmCollect(${index})">Collect</button>
            </div>
        `;
        collectList.appendChild(div);
    });

}

function confirmCollect(index) {
    const confirmation = confirm("Are you sure you want to collect this food item?");
    if (confirmation) {
        collection.push(donations[index]);
        alert("Food will be picked up soon.");
        deleteDonation(index);
        displayCollectList();
    }
}

function submitLocation() {
    const location = document.getElementById('infoLocation').value;
    const peopleCount = document.getElementById('peopleCount').value;

    if (location && peopleCount) {
        const infoLocation = {
            location,
            peopleCount
        };
        infoLocations.push(infoLocation);
        displayInfoList();
        alert("Location submitted successfully!");
        clearInfoForm();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayInfoList() {
    const infoList = document.getElementById('infoList');
    infoList.innerHTML = '';
    infoLocations.forEach((infoLocation, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong style="padding-right: 5px;">Location: ${infoLocation.location}</strong> 
            <span style="padding-right: 30px;">(People Count: ${infoLocation.peopleCount}) </span>
            <button onclick="deleteInfo(${index})">Delete</button>
        `;
        infoList.appendChild(div);
    });
}

function deleteInfo(index) {
    infoLocations.splice(index, 1);
    displayInfoList();
}

function clearDonationForm() {
    document.getElementById('foodName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('location').value = '';
    document.getElementById('image').value = '';
}

function clearInfoForm() {
    document.getElementById('infoLocation').value = '';
    document.getElementById('peopleCount').value = '';
}