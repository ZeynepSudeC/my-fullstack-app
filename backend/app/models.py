from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)

    license_owner = Column(String)
    contact_address = Column(String)
    phone = Column(String)

    license_status = Column(String)
    cancel_date = Column(String)
    cancel_reason = Column(String)
    license_number = Column(String)
    license_start = Column(String)
    license_end = Column(String)

    name = Column(String)
    city = Column(String)
    district = Column(String)

    fuel_type = Column(String)
    plant_type = Column(String)
    source = Column(String)

    capacity_mwm = Column(Float)
    capacity_mwe = Column(Float)
    operating_mwm = Column(Float)
    operating_mwe = Column(Float)
    storage_capacity_mwh = Column(Float)
    storage_installed_power_mwe = Column(Float)

    lat = Column(Float)
    lng = Column(Float)

class Onlisans_Plant(Base):
    __tablename__ = "onlisans_plants"

    id = Column(Integer, primary_key=True, index=True)

    license_owner = Column(String)
    contact_address = Column(String)
    phone = Column(String)

    license_status = Column(String)
    cancel_date = Column(String)
    cancel_reason = Column(String)
    license_number = Column(String)
    license_start = Column(String)
    license_end = Column(String)

    name = Column(String)
    city = Column(String)
    district = Column(String)

    fuel_type = Column(String)
    plant_type = Column(String)
    source = Column(String)

    capacity_mwm = Column(Float)
    capacity_mwe = Column(Float)
    operating_mwm = Column(Float)
    operating_mwe = Column(Float)
    storage_capacity_mwh = Column(Float)
    storage_installed_power_mwe = Column(Float)

    lat = Column(Float)
    lng = Column(Float)

    
