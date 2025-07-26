document.addEventListener('DOMContentLoaded', function () {
    // --- CONFIGURATION ---
    const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjgwNTY4M2FmYzU3NTRhMjdhNzM3M2U0ZmJhNjUxY2VhIiwiaCI6Im11cm11cjY0In0=';
    const DISTANCE_RATE_PER_KM = 19; // Rupees per kilometer
    const DRIVER_ALLOWANCE_PER_DAY = 500; // Fixed driver's allowance in Rupees per day

    // --- DOM ELEMENT REFERENCES ---
    const calculateBtn = document.getElementById('calculate-btn');
    const startLocationInput = document.getElementById('start-location');
    const endLocationInput = document.getElementById('end-location');
    const resultsDiv = document.getElementById('results');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessageDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    // --- INITIALIZATION ---
    if (ORS_API_KEY === 'YOUR_OPENROUTESERVICE_API_KEY' || !ORS_API_KEY) {
        showError('OpenRouteService API Key is missing. Please add your API key to script.js.');
        calculateBtn.disabled = true;
        calculateBtn.classList.add('opacity-50', 'cursor-not-allowed');
        return;
    }

    // --- EVENT LISTENERS ---
    calculateBtn.addEventListener('click', handleCalculation);

    // --- FUNCTIONS ---

    async function handleCalculation() {
        const startQuery = startLocationInput.value;
        const endQuery = endLocationInput.value;

        if (!startQuery || !endQuery) {
            showError('Please enter both a starting location and a destination.');
            return;
        }

        setLoadingState(true);

        try {
            const [startCoordinates, endCoordinates] = await Promise.all([
                geocodeLocation(startQuery),
                geocodeLocation(endQuery)
            ]);

            const routeData = await getRoute(startCoordinates, endCoordinates);
            // **REMOVED**: No longer fetching toll data
            const calculations = calculateCosts(routeData);
            displayResults(calculations);

        } catch (error) {
            console.error('Calculation Error:', error);
            showError(error.message || 'Could not calculate the route. Please check your locations and try again.');
        } finally {
            setLoadingState(false);
        }
    }

    async function geocodeLocation(query) {
        const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || !data.features || data.features.length === 0) {
            throw new Error(`Could not find location: "${query}"`);
        }
        
        return data.features[0].geometry.coordinates;
    }

    async function getRoute(start, end) {
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
        const body = JSON.stringify({ "coordinates": [start, end] });

        const response = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Content-Type': 'application/json',
                'Authorization': ORS_API_KEY
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        if (!data.features || data.features.length === 0) {
            throw new Error('No routes found between the selected locations.');
        }
        
        return data.features[0];
    }

    // **REMOVED**: The entire getTolls function is gone.

    function calculateCosts(route) {
        const distanceKm = route.properties.summary.distance / 1000;
        const durationSeconds = route.properties.summary.duration;
        const distanceCost = distanceKm * DISTANCE_RATE_PER_KM;
        
        // A day is considered 8 hours of driving for calculating allowance
        const days = Math.ceil(durationSeconds / (8 * 60 * 60));
        const driverAllowance = days * DRIVER_ALLOWANCE_PER_DAY;
        
        // **MODIFIED**: Total cost no longer includes tolls
        const totalCost = distanceCost + driverAllowance;

        return {
            distanceKm,
            durationSeconds,
            distanceCost,
            driverAllowance,
            totalCost
        };
    }

    function displayResults(costs) {
        const formatAsRupee = (amount) => new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);

        const formatDuration = (seconds) => {
            const d = Math.floor(seconds / (3600*24));
            const h = Math.floor(seconds % (3600*24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);

            const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
            const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            const mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
            const fullDuration = dDisplay + hDisplay + mDisplay;
            return fullDuration.trim().replace(/,$/, ''); // Remove trailing comma
        }

        document.getElementById('distance').textContent = `${costs.distanceKm.toFixed(2)} km`;
        document.getElementById('duration').textContent = formatDuration(costs.durationSeconds);
        document.getElementById('distance-cost').textContent = formatAsRupee(costs.distanceCost);
        document.getElementById('driver-allowance').textContent = formatAsRupee(costs.driverAllowance);
        document.getElementById('total-cost').textContent = formatAsRupee(costs.totalCost);

        resultsDiv.style.display = 'block';
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            hideError();
            resultsDiv.style.display = 'none';
            loadingSpinner.style.display = 'block';
            calculateBtn.disabled = true;
            calculateBtn.classList.add('opacity-50');
        } else {
            loadingSpinner.style.display = 'none';
            calculateBtn.disabled = false;
            calculateBtn.classList.remove('opacity-50');
        }
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessageDiv.style.display = 'block';
    }

    function hideError() {
        errorMessageDiv.style.display = 'none';
        errorText.textContent = '';
    }
});
