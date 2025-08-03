import pandas as pd
from app.database import SessionLocal, Base, engine
from app.models import Plant

# 🏗️ Eğer tablo yoksa oluştur
Base.metadata.create_all(bind=engine)

# 📥 Excel'den veriyi al
df = pd.read_excel("Elektrik_Uretim_Lisanslar.xlsx", engine="openpyxl")

# 🔗 Veritabanı oturumu başlat
db = SessionLocal()

for _, row in df.iterrows():
    plant = Plant(
        license_owner=row.get("Lisans Sahibi"),
        contact_address=row.get("İletişim Adresi"),
        phone=row.get("Telefon"),
        license_status=row.get("Lisans Durumu"),
        cancel_date=str(row.get("İptal/Sona Erdirme Tarihi", "")),
        cancel_reason=row.get("İptal/Sona Erdirme Açıklaması"),
        license_number=str(row.get("Lisans No")),
        license_start=str(row.get("Başlangıç Tarihi")),
        license_end=str(row.get("Bitiş Tarihi")),

        name=row.get("Tesis Adı"),
        city=row.get("İl"),
        district=row.get("İlçe"),
        fuel_type=row.get("Termik Üretim Tesisi Yakıt Türü"),
        plant_type=row.get("Tesis Türü"),
        source=row.get("Kaynak Türü"),

        capacity_mwm=row.get("Kurulu Güç (MWm)", 0.0),
        capacity_mwe=row.get("Kurulu Güç (MWe)", 0.0),
        operating_mwm=row.get("İşletmedeki Kapasite (MWm)", 0.0),
        operating_mwe=row.get("İşletmedeki Kapasite (MWe)", 0.0),
        storage_capacity_mwh=row.get("Toplam Depolama Kapasitesi (MWh)", 0.0),
        storage_installed_power_mwe=row.get("Toplam Depolama Kurulu Gücü (MWe)", 0.0),

        lat=row.get("enlem", 0.0),
        lng=row.get("boylam", 0.0)
    )

    db.add(plant)  # ✅ Eksikti

db.commit()   # ✅ Eksikti
db.close()    # ✅ Eksikti

print("✅ Excel verisi başarıyla veritabanına aktarıldı.")
