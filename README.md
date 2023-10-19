## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Comandos para migrar la bd 
```
npx prisma migrate dev --name init

para subir los cambios a la bd 

npx prisma db push  

npx prisma generate 
```