# Project description
```
This is Project demonstrating POM framework along with running tests in Docker
```

## settin up env
```
npm ci

```

## Running tests
```
npm run test
```

## Running tests in Docker
```
docker build -t playwrightdockerplayground .
docker run -it playwrightdockerplayground:latest npm run test
```

