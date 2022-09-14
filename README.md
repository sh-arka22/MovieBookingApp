Node JS API's for Movie Ticket Booking application

# MBA_APP - Movie Booking Application Backend API's
## _Learning the development of RESTful APIs for backend development_ 

This code base contains logic/structure for creating the Restful APIs for the MBA_APP app, Using which theatre owners can add theatres and can also have to add/remove/update movies in their theatres, Endusers can see what are all the theatres and what movies are playing in them and can also book tickets if wanted,  and finally based on booking we do the payment in a direct way not used any payment API and will trigger an email with payment ID and payment Invoice.
## Features
* Setting up project structure and database
* Setting up data models for resources such as for theatre, booking, movie, user and payment
* API for CRUD operation on above resources
* Ability to create, read, update based on authorization provided.

* Setting up data models for User item
* API for CRUD operation on User resource-
* Ability to create, read, update and User based on authorization provided.


## How is the code organized in this repo ?
Every code base is tested, So created new repo and merged everything to master branch for.

## Prerequisite
- Understanding of Node.js
- Understanding of Async Await
- Mongo DB locally installed and running
- Understanding Node CRON and Node Mailer API's

## Tech
- Node.js
- Mongodb


## Installation

this app requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run devStart
```


## Rest endpoints
#### 1. Customer/Theatre owner signup

```sh
POST /mba/api/v1/auth/signup
Sample request body :
{
	"name": "Arkajyoti",
	"userId": "Arkajyoti2",
	"email": "Arkajyoti@gmail.com",
	"password": "hello",
	"address": {
		"city": "Washington",
		"pinCode": 123456
	},
	"age": 22
} 

Sample response body :
{
    "_id": "62f28f3ca11a2a7922b4065f",
    "name": "Arkajyoti",
    "userId": "Arkajyoti2",
    "email": "Arkajyoti@gmail.com",
    "address": {
        "city": "Washington",
        "pinCode": 524002
    },
    "age": 22,
    "userType": "CUSTOMER"
}
```


---
#### 2. Customer/Theatre owner signin

```sh
POST /mba/api/v1/auth/signin
Sample request body :
{
	"userId": "Arkajyoti@2",
	"password": "hello"
} 

Sample response body :
{
	"_id": "62a0d5ee1e062b03c9996e92",
	"name": "Arkajyoti",
	"userId": "theatre1",
	"address": {
		"city": "Nellore",
		"pinCode": 524002
	},
	"age": 18,
	"userType": "THEATRE_OWNER",
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoZWF0cmUxIiwiaWF0IjoxNjYwMDYzNjU1LCJleHAiOjE2NjAwNjM3MTV9.SvlgwVPJIAITfnm_ZoHWrJzxkfIKjtLN39pS8RtLrS4",
	"refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoZWF0cmUxIiwiaWF0IjoxNjYwMDYzNjU1LCJleHAiOjE2NjAwNjcyNTV9.     rFCSBc4h0jnsZkexHLRjfvjACQahRmt9vU3KGEdz-lw"
}

```
---
#### 3. Creating theatre
```sh
POST /mba/api/v1/theatres
Sample request body :
{
	"name" : "PVR",
	"description" :"nice place to watch movies",
	"theatreOwnerId": "62a0d5ee1e062b03c9996e92",
	"city" : "AP",
	"pinCode" : 524001,
	"totalSeats" : 105,
	"ticketPrice": 100
}

Sample response body :
{
	"name": "PVR",
	"description": "nice place to watch movies",
	"city": "AP",
	"pinCode": 524001,
	"totalSeats": 105,
	"ticketPrice": 100,
	"movies": [],
	"owner": "62a0d5ee1e062b03c9996e92",
	"_id": "62a0d6d88bf107ac2f3ba944",
	"createdAt": "2022-06-08T17:05:28.465Z",
	"updatedAt": "2022-06-08T17:05:28.465Z",
	"__v": 0
}
```
---
#### 4. Update theatre (includes adding movie to theatre)
```sh
PUT /mba/api/v1/theatres/6298e9872e132e698039e5f5
Sample request body :
{
	"name" : "PVAR",
	"description" :"nice place to watch movies here",
	"city" : "Nellore",
	"pinCode" : 524001,
	"totalSeats" : 105
}

Sample response body :
{
	"_id": "6298e9872e132e698039e5f5",
	"name": "PVAR",
	"description": "nice place to watch movies here",
	"city": "Nellore",
	"pinCode": 524001,
	"totalSeats": 105,
	"movies": [],
	"owner": "6298e8c23514e77944980160",
	"createdAt": "2022-06-02T16:47:03.119Z",
	"updatedAt": "2022-06-02T16:47:03.119Z",
	"__v": 0
}
```

---
#### 5. Get theatres
```sh
GET /mba/api/v1/theatres?city=Pune

Sample response body :
[
	{
		"_id": "62912cfa77d0c65fa3ad1134",
		"name": "PVR",
		"description": "nice place to watch movies",
		"city": "Pune",
		"pinCode": 411028,
		"totalSeats": 100,
		"movies": [],
		"createdAt": "2022-05-27T19:56:42.781Z",
		"updatedAt": "2022-05-27T19:56:42.781Z",
		"__v": 0
	},
	{
		"_id": "62912cfa77d0c65fa3ad1136",
		"name": "INOX",
		"description": "corner seat available",
		"city": "Pune",
		"pinCode": 411033,
		"totalSeats": 100,
		"movies": [],
		"createdAt": "2022-05-27T19:56:42.798Z",
		"updatedAt": "2022-05-27T19:56:42.799Z",
		"__v": 0
	}
]
```

---
#### 6. When a new movie comes

```sh
POST /mba/api/v1/movies
Sample request body :
{
	"name": "SHAWSHANK REDEMPTION",
	"description":"This is south indian movie.",
	"cast":"efjh",
	"director":"ejfh",
	"trailerUrls":"xyz123.com",
	"posterUrls":"xyz123.in",
	"releaseDate": "06-25-2022"
}

Sample response body :
{
	"name": "SHAWSHANK REDEMPTION",
	"description": "This is south indian movie.",
	"cast": [
		"efjh"
	],
	"director": "ejfh",
	"trailerUrls": [
		"xyz123.com"
	],
	"posterUrls": [
		"xyz123.in"
	],
	"language": "HINDI",
	"releaseDate": "2022-06-24T18:30:00.000Z",
	"releaseStatus": "RELEASED",
	"_id": "62a0d48b885d401e2190797c",
	"createdAt": "2022-06-08T16:55:39.045Z",
	"updatedAt": "2022-06-08T16:55:39.045Z",
	"__v": 0
}
```

---
#### 7. Get available movies

```sh
GET /mba/api/v1/movies

Sample response body :
[
	{
		"_id": "6298e59c95be31cf36c33438",
		"name": "Puspa",
		"description": "This is south indian movie.",
		"cast": [
			"Allu Arjun"
		],
		"director": "Puspraj",
		"trailerUrls": [
			"xyz123.com"
		],
		"posterUrls": [
			"xyz123.in"
		],
		"language": "HINDI",
		"releaseDate": "2022-05-24T18:30:00.000Z",
		"releaseStatus": "RELEASED",
		"createdAt": "2022-06-02T16:30:20.061Z",
		"updatedAt": "2022-06-02T16:30:20.061Z",
		"__v": 0
	}
]
```


---
#### 8. Book movie tickets

```sh
POST /mba/api/v1/bookings
{
	"theatreId": "62a0d6d88bf107ac2f3ba944",
	"movieId": "62a0d48b885d401e2190797c",
	"userId": "6298e4b1334f00c926a8d935",
	"showTime": "08-06-2022",
	"noOfSeats": "3"
}

Sample response body :
{
	"theatreId": "62a0d6d88bf107ac2f3ba944",
	"movieId": "62a0d48b885d401e2190797c",
	"userId": "6298e4b1334f00c926a8d935",
	"showTime": "2022-08-05T18:30:00.000Z",
	"noOfSeats": 3,
	"totalCost": 300,
	"status": "IN_PROGRESS",
	"_id": "62a0ea26228e9207504c75cf",
	"createdAt": "2022-06-08T18:27:50.083Z",
	"updatedAt": "2022-06-08T18:27:50.084Z",
	"__v": 0
}
```


---
#### 9. Make payment

```sh
POST /mba/api/v1/payments
Sample request body :
{
	"bookingId": "62a0ea26228e9207504c75cf",
	"amount": 300
}

Sample response body :

{
    "_id": "6298e59c95be31cf36c33438",
    "bookingId": "62a0ea26228e9207504c75cf",
    "description": "This is south indian movie.",
    "amount": 300,
    "status": "COMPLETED",
    "createdAt": "2022-06-02T16:30:20.061Z",
    "updatedAt": "2022-06-02T16:30:20.061Z",
    "__v": 0
}
```

##### Incase of having any issues/doubts in running the API's or understanding the code.
##### Please feel free to contact me : Arkajyoti55591@gmail.com