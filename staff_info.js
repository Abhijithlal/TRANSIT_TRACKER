document.getElementById('searchBtn').addEventListener('click', fetchApi);

async function fetchApi() {
    const from = document.getElementById('fromInput').value;
    const to = document.getElementById('toInput').value;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const url = `https://onlineksrtcswift.com/api/resource/searchRoutesV4?fromCityName=${from}&toCityName=${to}&journeyDate=${date}&mode=oneway`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            displayNoResultsMessage();
        } else {
            displayBusResults(data);
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

function displayNoResultsMessage() {
    const busResults = document.getElementById('busResults');
    busResults.innerHTML = '<p>No bus results found.</p>';
}

function displayBusResults(data) {
    const busResults = document.getElementById('busResults');
    busResults.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('bus-table');

    // Create table header
    const headers = ['Service Type', 'Departure Time', 'Arrival Time'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate table with data
    data.forEach(bus => {
        const row = document.createElement('tr');
        row.classList.add('bus-row');
        const serviceTypeCell = document.createElement('td');
        serviceTypeCell.textContent = bus.ServiceType;
        row.appendChild(serviceTypeCell);
        const departureTimeCell = document.createElement('td');
        departureTimeCell.textContent = bus.DepartureTime;
        row.appendChild(departureTimeCell);
        const arrivalTimeCell = document.createElement('td');
        arrivalTimeCell.textContent = bus.ArrivalTime;
        row.appendChild(arrivalTimeCell);

        // Add event listener to each row
        row.addEventListener('click', function() {
            // Store routescheduleid in localStorage
            localStorage.setItem('routescheduleid_staff', bus.RouteScheduleId);
            localStorage.setItem('from', from);
            localStorage.setItem('to', to);

            // Redirect to another file
            window.location.href = 'staff_profile.html';
        });

        table.appendChild(row);
    });

    busResults.appendChild(table);
}
