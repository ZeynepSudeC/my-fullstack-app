import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()

# Ortam değişkeninden veritabanı bağlantısını al
DATABASE_URL = os.getenv("DATABASE_URL")

# Engine (bağlantı motoru) oluştur
engine = create_engine(DATABASE_URL)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ORM modelleri için Base sınıfı
Base = declarative_base()
