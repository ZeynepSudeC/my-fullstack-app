import pandas as pd
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Onlisans_Plant

# Excel dosyasını oku
df = pd.read_excel("Elektrik_Uretim_Onlisanslar.xlsx")

# Veritabanı oturumu başlat
db: Session = SessionLocal()

# Her satırı veritabanına ekle
for _, row in df.iterrows():
    plant = Onlisans_Plant(
        license_owner=row.get("Lisans Sahibi"),
        contact_address=row.get("İletişim Adresi"),
        phone=row.get("Telefon"),
        license_status=row.get("Lisans Durumu"),
        cancel_date=row.get("İptal/Sona Erdirme Tarihi"),
        cancel_reason=row.get("İptal/Sona Erdirme Açıklaması"),
        license_number=row.get("Lisans No"),
        license_start=row.get("Başlangıç Tarihi"),
        license_end=row.get("Bitiş Tarihi"),
        name=row.get("Tesis Adı"),
        city=row.get("İl"),
        district=row.get("İlçe"),
        fuel_type=row.get("Termik Üretim Tesisi Yakıt Türü"),
        plant_type=row.get("Tesis Türü"),
        source=row.get("Kaynak Türü"),
        capacity_mwm=row.get("Kurulu Güç (MWm)"),
        capacity_mwe=row.get("Kurulu Güç (MWe)"),
        operating_mwm=row.get("İşletmedeki Kapasite (MWm)"),
        operating_mwe=row.get("İşletmedeki Kapasite (MWe)"),
        storage_capacity_mwh=row.get("Toplam Depolama Kapasitesi (MWh)"),
        storage_installed_power_mwe=row.get("Toplam Depolama Kurulu Gücü (MWe)"),
        lat=row.get("enlem"),
        lng=row.get("boylam"),
    )
    db.add(plant)

db.commit()
db.close()

print("✅ Önlisans verileri başarıyla onlisans_plants tablosuna yüklendi.")
