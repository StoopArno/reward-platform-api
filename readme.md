# Reward-platform api documentation
This nodeJS api is based on the project located at the following [git repo](https://github.com/FlorianDH/rewards).

## Setup info
Clone the repo and use the following command in a terminal which start a local nodeJS server:
```
npm start
```
This refers to the script defined in package.json, which runs nodemon on 'server.js'. It's very important to use 'npm start' otherwise the nodemon configuration won't work.
## Configuration info
The port of the nodeJS api can be configured using nodemon.json where you can find it under "PORT". There are a couple other environment variables there wich are used to connect to the mongoDB that is used in the api.
```
"env": {        
    "DB_PORT": "27017",
    "DB_ADDRESS": "localhost",
    "DB_NAME": "reward-platform",
    "PORT": "3000" 
}
```

## API information
There are a number of resources that can be queried at this time. These resources are:
* achievements
* challenges
* challengeRequests
* rewards
* users

A basic getAll can be performed by a simple GET request on the base resource:
```
GET /rewards
```
Inserting a resource is done by sending a POST request to the base resource, along with the necessary parameters in the body as JSON:
```
POST /rewards
{
	"points": "0",
	"descriptionShort": "exampleShortDescription",
	"descriptionLong": "exampleLongDescription"
}
```
Requesting a specific resource based on id is done by adding the id in the url:
```
GET /rewards/exampleid123
```
Deleting a resource works in the same way but with a DELETE request:
```
DELETE /rewards/exampleid123
```
Lastly we have the updating of a resource, which works the same as a POST but in a PATCH request and an array of the fields that are to be updated:
*Note that not all attributes are necassary, only the ones that need to be updated*
```
PATCH /rewards/exampleid123
[
	{"propName": "points", "value": "0"},
	{"propName": "descriptionShort", "value": "new descriptionShort"}
]
```