# Python-Flask-D3-Visualizations
Full stack application where Python flask server provides data to be visualized on frontend using HTTP requests and D3.js library to visualize it

The application is split in 2 domains: frontend and backend:

Backend has 1 single python file: app.py which has all the configuration for sending data to the frontend
To run the server, first make sure all libraries mentioned in the file are installed and then run python app.py command in cmd for server to be started on localhost, port 5000.

Frontend has the necessary files to fetch data from backend and visualize it using D3.js library.
Apache server is required to run frontend files (due to D3 library). You can use any Apache server environment like Wamp, xampp etc.

Make sure server is running to fetch data into frontend.

## Radviz Visualization before clustering:

![alt text](https://raw.githubusercontent.com/shahaadesh5/Python-Flask-D3-Visualizations/master/screenshots/visualization.PNG)

## Radviz Visualization after clustering:

![alt text](https://raw.githubusercontent.com/shahaadesh5/Python-Flask-D3-Visualizations/master/screenshots/visualization2.PNG)
