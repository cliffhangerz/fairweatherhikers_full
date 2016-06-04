# fairweatherhikers
Fairweatherhikers is a command-line-based two-resource Mongo-backed REST API for planning hikes and saving trail data. It interfaces with the National Weather Service website to pull weather data. The user may populate the trails database with their own favorite hikes or select some of the ones already contained in the db.txt file.

## Model
The model used for creating a hike is as follows:

```js
{
  loc: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  difficulty: {
    type: String
  },
  length: {
    type: String
  },
  time: {
    type: Number
  }
}
```

## Running
Multiple terminal windows are required for setup; Iterm is a great app for this. Also, a CLI such as httpie is required to make http requests.

### Clone the app
Fork this repo and clone it on your machine:
```bash
> git clone https://github.com/cliffhangerz/fairweatherhikers
```

### Navigate to project directory
Type this:
```bash
> cd fairweatherhikers
```

### Install packages
```bash
> npm install
```

### Start mongodb
```bash
> mongod --dbpath=./db
```

### Run tests
Open a second terminal window, navigate to the project directory, and type:
```bash
> gulp
```

### Set your app secret
```bash
> export APP_SECRET="appsecret"
```

### Run the server
```bash
> npm start
```

##Sign-up
Open a third terminal window and type the following (or you can substitute your own email and password):
```bash
> export PORT=3000
```
```bash
> echo '{"email": "sasquatch@gmail.com", "password" : "bigandhairy"}' | http POST localhost:3000/api/signup
```

##Sign-in
The following example is for users with httpie already installed. Feel free to use your own favorite CLI instead.
```bash
> http -a sasquatch@gmail.com:bigandhairy localhost:3000/api/signin
```
The program will return an auth token. It will be in the format "token":"a whole bunch of characters"
MAKE SURE YOU COPY the auth token (i.e., `"token":"a whole bunch of characters"` ) before continuing. You will be needing this token for CRUD actions.

## CRUD operations

###POSTing a new trail
To post a new trail, you will need to include the following in your request:
* Location (loc)
* Latitude (lat)
* Longitude (lon)
* Difficulty (difficulty) [either Easy, Moderate, or Hard]
* Length (len) in roundtrip miles
* Time (time) in hours to complete for an average hiker
* Token (between two double-quote marks, paste the value obtained from the sign-in step). Ensure that you don't put a space in between the "token": and the token value, and also that the token is enclosed by only a single pair of quotes.

This information can be found at many websites. We found the Washington Trails Association (wta.org) and Hiking With My Brother (hikingwithmybrother.com) websites to be very helpful.
Here is an example using httpie (requires json format); you should replace "PASTE_TOKEN_IN_HERE" with your own token:
```bash
> echo '{"loc":"Commonwealth Basin - Red Mtn. Pass", "lat":47.4605, "lon":121.3976, "difficulty":"hard", "length":"7.2", "time":5.5}' | http post localhost:3000/api/trails "token":"PASTE_TOKEN_IN_HERE"
```
After a successful post, the app returns a record id `(_id)` associated with this trail. **This id is necessary to change trail information in a future PUT request.**

###PUTting new info into the db (overwrites existing document)
A PUT request will overwrite a saved trail entirely. The syntax using httpie would be: `http PUT [URL, including record ID at end] [new info] [insertYourTokenHere]`. An example:
```bash
> http PUT localhost:3000/api/trails/`insertYourRecordIDHere` "loc"="Commonwealth Basin - Red Mountain Trail" "token":"PASTE_TOKEN_IN_HERE"
```

###GETting info from the db (part 1)
GET is the default in httpie, so you don't need to explicitly include it in the request. The following is an example that gets trail info from all trails in the db.
```bash
> http localhost:3000/api/trails
```

###GETting info from the db (part deux)
The programs's "Hike Match" functionality returns all trails associated with a particular user. The following is an example that gets trail info from all trails in the db. It includes the three-day weather report for that location, and requires a token just like the POST request.
```bash
> http localhost:3000/api/hikematch "token":"PASTE_TOKEN_IN_HERE"
```

###DELETE a trail
You might want to delete a trail from the db if you no longer want fairweatherhikers to consider it as a query option. You should do a GET request to obtain the record number of the trail you want to delete.
```bash
> http DELETE localhost:3000/api/trails/`insertYourRecordIDHere`
 "loc"="Commonwealth Basin Trail" "token":"PASTE_TOKEN_IN_HERE"

```

## Authors

Written by
[Ali Forman](https://github.com/AlegriaForman),
[Gene Troy](https://github.com/energene),
[James Norton](https://github.com/jimmynono), and
[Tim Forman](https://github.com/T4Man)


## Acknowledgements
Thanks to the National Weather Service, the Washington Trails Association, and Hiking With My Brother, we have high quality data for use in our project.

## License

The project is licensed under the terms of the MIT license.
