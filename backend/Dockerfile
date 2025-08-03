# Python tabanlı bir image kullanıyoruz
FROM python:3.10-slim

# Uygulama dizinine geç
WORKDIR /app

# Gereksinimleri kopyala ve yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama dosyalarını kopyala
COPY ./app ./app

# Uvicorn ile başlat
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]