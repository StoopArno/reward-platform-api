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
* achievementTypes
* challenges
* challengeRequests
* rewards
* rewardClaims
* userAchievements
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

### Search functionality
A search can be performed with a GET request:
```
GET /rewards/search
```
The parameters of the search are given through the request body. A basic search on string would look like this:
*Note that the 'adv' property is not nessecary. Not including this would mean the search would like for equal values.*
```
[
    {
        "propName": "name",
        "value": "u",
        "adv": "like"
    }
]
```
As you can see, this endpoint accpets an array of objects. Each object is a seperate applies another filter. An example of this is the following:
```
[
    {
        "propName": "name",
        "value": "u",
        "adv": "like"
    },
    {
        "propName": "totalPoints",
        "value": "100",
        "adv": "gt"
    }
]
```
Here we are looking for a user where the name contains 's' and has an amount of totalpoints greater than 100.
The following is a list of operators tha can be used in the 'adv' property.
* gt - greater than
* lt - lesser than
* gte - greater than or equal to
* lte - lesser than or equal to
* like

### Joining collections/tables
Sometimes instead of just the id referencing an entry in another table/collection you might need the whole object being referenced.
This is done through the population of objects. This is possible on all GET endpoints of the resources that have any references to other tables:
* rewardClaims
* userAchievements
* achievements
* achievementTypes
* challengeRequests
Here you can see an example of a request that 'joins' two other collections:
```
GET /challengeRequests?populate=user,challenge
```
It is important that the names of the tables are only sepperated by 1 comma: , . Not a point or any other method of seperating the values.
*Note this is alse possible in combination with the /search endpoints of the various resources.*

### Authentication