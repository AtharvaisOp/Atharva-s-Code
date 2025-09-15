*Trip Cost Calculator*

Description
This web application helps users estimate the cost of a car trip. Users can enter their starting and ending locations, and the application will display the estimated travel time, distance, and cost for the trip. This tool is powered by the OpenRouteService API.

Features
Trip Cost Estimation: Calculates the estimated cost of a trip based on the distance and a per-kilometer rate, including a driver's allowance.

Distance and Time Calculation: Displays the total distance of the trip in kilometers and the estimated travel time.

Interactive Map: Shows the route on an interactive map.

How To Use
Enter Starting Location: In the "From" field, type in your starting city.

Enter Destination: In the "To" field, type in your destination city.

View Trip Details: The application will display the trip details, including:

Total distance (in kilometers)

Estimated travel time

Estimated trip cost (excluding tolls and parking)

Drawback
No Typo Tolerance for City Names: The application requires users to enter city names without any spelling errors. Since the map API is fed raw data, it cannot interpret misspelled city names, and will not be able to calculate the trip details if there are typos in the input.
