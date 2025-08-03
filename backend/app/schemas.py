from pydantic import BaseModel

class PlantOut(BaseModel):
    id: int
    name: str
    city: str | None = None
    district: str | None = None
    capacity_mwe: float
    plant_type: str
    lat: float
    lng: float
    source: str
    license_status: str | None = None

    class Config:
        orm_mode = True

class OnlisansPlantOut(BaseModel):

    id: int
    name: str
    city: str | None = None
    district: str | None = None
    capacity_mwe: float
    plant_type: str
    lat: float
    lng: float
    source: str
    license_status: str | None = None

    class Config:
        orm_mode = True

    
    
        
