FROM python:3.11.1

# 
WORKDIR /code

# 
COPY ./service/requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./service /code/

RUN ls -a ./

# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9091"]