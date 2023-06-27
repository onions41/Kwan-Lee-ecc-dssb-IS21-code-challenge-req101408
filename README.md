### About the project

This is Kwan Lee's solution to the code challenge for the IS-21 Full Stack Developer position (Kwan-Lee-ecc-dssb-IS21-code-challenge-req101408). Thank you very much for considering my application for the position.

(You can quickly take a look at the finished app deployed on my personal domain at https://bc-public-service.beefsupreme.one)


### Instructions for running on a local machine

1. Please make sure you are running Node version 18 (>=18.0.0 <19.0.0) and NPM version 9 (>=9.0.0 <10.0.0) on your local machine.

2. Clone the repository onto your local machine.
	```sh
	git clone https://github.com/onions41/Kwan-Lee-ecc-dssb-IS21-code-challenge-req101408.git
	```

3. Once you have cloned the repository onto your local machine, open a command window inside the cloned directory and run the following commands.
  	```sh
  	npm install
  	```
  	Wait until all packages are installed.
  	```sh
  	npm run serve
  	```
  	The app is listening on localhost:3000

4. Open a browser (Chrome or Firefox preferred) and navigate to localhost:3000


### Additional notes
* The source code for the API component is inside the (`api_source/`) directory. This has already been transpiled for deployment. The transpiled code is inside (`api_build/`). The API entrypoint is (`index.js`).
* The API Swagger documentation is in (`swagger.yaml`).
* The API provides endpoints that serve JSON data displayed by the front-end application and also serves the front-end application itself.
* The front-end application is a React microservice and can be hosted on a separate server if required.
* The source code for the front-end application is inside (`react_frontend/src/`). It has already been built for deployment. The build files are inside (`react_frontend/build/`).
* The API serves the front-end by serving the build files at the root (`/`) route.