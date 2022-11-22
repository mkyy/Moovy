<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Moovy server-side application with NestJS.</p>
  
## API Reference

#### Get all movies

```http
  GET /api/movies
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- | 
| :-------- | :------- | Return all movies saved on library |

#### Post movie

```http
  POST /api/movie
```

| Parameter | Type           | Description                                |
| :------   | :------------- | :----------------------------------------- |
| `body`    | `SaveMovieDTO` | **Required**. Movie data to add on library |

#### Delete movie

```http
  DELETE /api/movie
```

| Parameter | Type             | Description                                     |
| :------   | :--------------- | :---------------------------------------------- |
| `body`    | `DeleteMovieDTO` | **Required**. Movie data to delete from library |

#### Post audio

```http
  POST /api/audio/:id
```

| Parameter | Type             | Description                                     |
| :------   | :--------------- | :---------------------------------------------- |
| `id`      | `string`         | **Required**. Must sent audio file via formData |

#### Delete audio

```http
  DELETE /api/audio/:moveId/:audioID
```

| Parameter          | Type             | Description                                                    |
| :------            | :--------------- | :------------------------------------------------------------- |
| `movieId, audioID` | `string, number` | **Required**. remove audio from movie and delete from database |

#### Get audio

```http
  GET /audio/:id
```
| Parameter | Type        | Description                                   |
| :------   | :---------- | :-------------------------------------------- |
| `id`      | `number`    | **Required**. Return the audio by specific ID |



## Installation

You did all steps of root README, and now you just need a few steps to start running:
Install dependencies

```bash
$ npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`= 8080

`DB_HOST`= `<your db_host>`

`DB_PORT`= `<your db_port>`

`DB_DATABASE`= `<your database name>`

`DB_USERNAME`= `<your username>`

`DB_PASSWORD`= `<your password>`

## Running the app

Now you're all done to run.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
