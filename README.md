# Link Shortener

An easy and practical link shortener.

## Built With

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white">

## How to Run

Follow the instructions to run the app locally

1. Clone this repository.
2. Install all dependencies

```bash
   npm i
```

3. Create a database in PostgreSQL with any name you want
4. Create a .env.development file and fill it out following the example provided in the .env.example file.
5. Run script to create all tables in your database

```bash
  npm run migration
```

6. Run script

```bash
  npm run dev
```

7. Access http://localhost:PORT, where PORT it's value of your PORT variable in .env.development file.

## Documentation

### 1. POST /sign-up

Create a new user.

This is the required format of the body:

```code
  {
    "email": "joe@gmail.com",
    "password": "my secret password"
  }
```

Successful response:

- Status code 201

### 2. POST /sign-in

Sign in to the application

This is the required format of the body:

```code
  {
    "email": "joe@gmai.com",
    "password": "my secret password"
  }
```

Successful response:

- Status 200
- Body :

```code
 {
   "token": "your-token"
 }
```

### 3. POST /urls

Create a new url. It is optionally send a token.

This is the required format of the body:

```code
  {
    "url": "https://www.freecodecamp.org/"
  }
```

This is the required format of the authorization if you wants to send:

```code
  {
    headers: {
	  "Authorization": "Bearer your-token"
	}
  }
```

Successful response:

- Status 201
- Body :

```code
 {
   "id": 15,
   "url": "https://www.freecodecamp.org/",
   "shortened_url": "5xowg5bcj",
   "user_id": null,
   "created_at": "2023-06-11T03:00:00.000Z"
 }
```

### 4. GET /:shortened_url

Redirects the user at webiste associated with shortened URL. The 'shortened_url' params must be a valid string.

Successful response:

- Status 200

### 5. GET /urls/ranking

Get the most 100 urls visited.

Successful response:

- Status 200
- Body :

```code
  [
    {
      "id": 14,
      "url": "https://app.daily.dev/",
      "shortened_url": "dhymvtm46",
      "user_id": null,
      "created_at": "2023-06-11T03:00:00.000Z",
      "num_visits": "0"
    }
  ]

```

### 6. DELETE /urls/:id

Delete any URL that was created by the user. Is mandatory send a token associated to user. The 'id' params must be a valid number, that identifies a url.

This is the required format of the authorization if you wants to send:

```code
  {
    headers: {
	  "Authorization": "Bearer your-token"
	}
  }
```

Successful response:

- Status 200

### 7. GET /urls/my-urls

Get all URLS of a unique user.
Successful response:

- Status 200
- Body :

```code
  [
    {
      "id": 14,
      "url": "https://app.daily.dev/",
      "shortened_url": "dhymvtm46",
      "user_id": null,
      "created_at": "2023-06-11T03:00:00.000Z",
      "num_visits": "0"
    }
  ]

```
