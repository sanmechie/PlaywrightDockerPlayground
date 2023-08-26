# Project description
```
Simple Angular app and Fast API service
```

## settin up UI env
```
npm ci
npm start
```
## settin up API env
```
.\service\venv.bat
```

## Running tests
```
npm run test
```

## Deploying app via kubectl and Docker-desktop
```
kubectl apply -f app-pod.yaml # To deploy fastapi
kubectl apply -f ng-pod.yaml  # to deploy UI app
```

