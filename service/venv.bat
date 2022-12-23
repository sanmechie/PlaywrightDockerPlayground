@echo on
echo Creating venv
call python -m venv fast_api
call .\fast_api\Scripts\activate
call pip install --upgrade pip --user