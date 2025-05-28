FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

#IN CAZ CA SE SCHIMBA requirements.txt intram in run
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    playwright install --with-deps

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
