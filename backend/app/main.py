from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from . import models,schemas


app = FastAPI()

# CORS (React frontend erişebilsin diye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme için tüm kaynaklara açık
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Veritabanı tablolarını oluştur
Base.metadata.create_all(bind=engine)

# Dependency: Veritabanı oturumu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Test endpoint (artık veritabanı bağlantısı içeriyor)
@app.get("/plants", response_model=list[schemas.PlantOut])
def read_plants(db: Session = Depends(get_db)):
    return db.query(models.Plant).all()

@app.get("/onlisans_plants", response_model=list[schemas.OnlisansPlantOut])
def read_onlisans_plants(db: Session = Depends(get_db)):
    return db.query(models.Onlisans_Plant).all()
