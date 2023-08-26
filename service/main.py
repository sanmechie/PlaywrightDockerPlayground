from fastapi import FastAPI
import uvicorn
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



GLOBAL_DATA = [
    {'name': 'Mumbai',
     'area': 1000},
    {'name': 'Bangalore',
     'area': 1200}
    
]


GLOBAL_PRODUCTS = [
  {"id": "1",
   "type": "credit_card",
   "name": "Citi",
   "version": "1.0"
    
    
    },
    {"id": "2",
   "type": "credit_card",
   "name": "Citi",
   "version": "1.1"
    
    }
    
]

class Products(BaseModel):
    id: str
    type: str
    name: str
    version: str

class City(BaseModel):
    name: str
    area: int


@app.get('/health')
def get_status():
    return JSONResponse(content={'status':'Healthy'})


@app.get('/cities')
def get_cities():
    return JSONResponse(content=GLOBAL_DATA) if GLOBAL_DATA else 'No cities found'

@app.post('/cities')
def create_cities(city: City):
    print(city)
    if city.name.lower() not in [v.lower() for i in GLOBAL_DATA for k, v in i.items() if k =='name']:
        GLOBAL_DATA.append({'name': city.name, 'area': city.area})
        return city
    return f'{city.name} already exists'


@app.get('/products')
def get_products(id: str=None):
    if id:
        for product in GLOBAL_PRODUCTS:
            prd  = product.get('id', None)
            if prd == id:
                return product
            else:
                return "No Such Product exists"
    else:
        return JSONResponse(content=GLOBAL_PRODUCTS)


    
    
    
# if __name__ == '__main__':
#     uvicorn.run(app, host='0.0.0.0', port=9091)
    
    