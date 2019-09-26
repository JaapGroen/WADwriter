# WADwriter

> A Vue.js project for adding custom SR datasets to the WADQC framework


## Prerequisites
* WADQC-server (https://bitbucket.org/MedPhysNL/wadqc/downloads/)
* Nodejs (https://nodejs.org/en/download/)
* Vue CLI (https://cli.vuejs.org/guide/installation.html)

## Installation
* Clone the repository
``` bash
> git clone https://github.com/JaapGroen/WADwriter.git WADwriter
```
* Enter folder and install dependencies with npm
``` bash
> cd WADwriter
> npm install
```
* Run a test version with hot-reloading
``` bash
> npm run dev
```

## Production
* Optionally edit the pre-filled api information in src/store/store.js, line 12
``` bash
> nano src/store/store.js
```
* Build the production
``` bash
> npm run build
```
* Add WADwriter to your webserver with DocumentRoot "WADwriter-folder/dist"
