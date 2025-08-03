# Node tabanlı image
FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Paketleri yükle
RUN npm install

# Geri kalan her şeyi kopyala
COPY . .

# Uygulamayı başlat
CMD ["npm", "start"]