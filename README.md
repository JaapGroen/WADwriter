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

## Usage
* The tool makes use of the json data in the file "recipes.json" in the static/public folder. It enables pre-defined datasets which are partly prefilled with the proper dicom fields and information. The file can be edited outside the vue js development enviroment. 
