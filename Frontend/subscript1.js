const url = 'http://localhost:3000/drivers';
const get = (element) => document.getElementById(`${element}`);
const create = (element) => document.createElement(`${element}`);
//
async function getUserData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
        throw data;
    }
    console.log(data);
    // Sort data based on ranking in ascending order
    data.sort((a, b) => a.ranking - b.ranking);
    updateProfile(data);
}

function updateProfile(data) {
    const driversContainer = get('drivers-container');
    data.forEach(driver => {
        const driverCard = create('div');
        driverCard.classList.add('driver-card');
        driverCard.innerHTML = `
            <h2 class="idcolor">Ranking: <span class="driver-id">${driver.ranking}</span></h2>
            <h3>Name: ${driver.name}</h3>
            <h3>Age: ${driver.age}</h3>
            <h3>Violations: <span class="driver-id">${driver.violations} times</span></h3>
            
            <h3>Driver ID: <span class="driver-id">${driver.id}</span></h3>
        `;
        driversContainer.appendChild(driverCard);
    });
    // console.log(data);
} 
getUserData(url);

console.log('Hello World!841888888');