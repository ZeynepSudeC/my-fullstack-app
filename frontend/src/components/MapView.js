import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Button, Checkbox, AutoComplete, InputNumber } from "antd";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";

const MapView = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  const [licenseTypes, setLicenseTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [minCapacity, setMinCapacity] = useState(null);
  const [maxCapacity, setMaxCapacity] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [openPanels, setOpenPanels] = useState({
    license: false,
    type: false,
    source: false,
  });

  useEffect(() => {
    const endpoints = [];
    if (licenseTypes.includes("plants")) endpoints.push("http://localhost:8000/plants");
    if (licenseTypes.includes("onlisans_plants")) endpoints.push("http://localhost:8000/onlisans_plants");

    Promise.all(endpoints.map((url) => fetch(url).then((res) => res.json())))
      .then((results) => {
        const combined = results.flat();
        setPlants(combined);
        setFilteredPlants([]);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, [licenseTypes]);

  const plantTypes = [...new Set(plants.map((p) => p.plant_type).filter(Boolean))];
  const sourceTypes = [...new Set(plants.map((p) => p.source).filter(Boolean))];
  const cityOptions = [...new Set(plants.map((p) => p.city).filter(Boolean))];
  const districtOptions = selectedCity
    ? [...new Set(plants.filter((p) => p.city === selectedCity).map((p) => p.district).filter(Boolean))]
    : [];

  const getColor = (source) => {
    const normalized = (source || "").toLowerCase().replace(/\s/g, "");
    if (normalized.includes("anakaynak")) return "orange";
    if (normalized.includes("yardımcıkaynak")) return "black";
    return "gray";
  };

  const applyFilter = () => {
    const filtered = plants.filter((p) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.plant_type);
      const matchesSource = selectedSources.length === 0 || selectedSources.includes(p.source);
      const matchesCity = !selectedCity || (p.city && p.city.toLowerCase() === selectedCity.toLowerCase());
      const matchesDistrict = !selectedDistrict || (p.district && p.district.toLowerCase() === selectedDistrict.toLowerCase());
      const matchesCapacity =
        (minCapacity === null || p.capacity_mwe >= minCapacity) &&
        (maxCapacity === null || p.capacity_mwe <= maxCapacity);

      return matchesType && matchesSource && matchesCity && matchesDistrict && matchesCapacity;
    });

    setFilteredPlants(filtered);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setLicenseTypes([]);
    setSelectedTypes([]);
    setSelectedSources([]);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setMinCapacity(null);
    setMaxCapacity(null);
    setFilteredPlants([]);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {!showFilters && (
        <Button
          shape="circle"
          icon={<FilterOutlined />}
          onClick={() => setShowFilters(true)}
          style={{
            position: "absolute",
            top: 80,
            left: 16,
            zIndex: 1000,
            width: 40,
            height: 40,
            backgroundColor: "#f58320",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />
      )}

      {showFilters && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 16,
            zIndex: 1000,
            width: 280,
            maxHeight: "calc(100vh - 130px)",
            overflowY: "auto",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <h4 style={{ margin: 0 }}>Filtreleme</h4>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setShowFilters(false)}
              style={{
                color: "#555",
                fontSize: 16,
                padding: 0,
                lineHeight: 1,
              }}
            />
          </div>

          {/* Açılır filtre panelleri ve giriş alanları */}
          <div style={{ marginBottom: 12 }}>
            <div
              onClick={() => setOpenPanels((prev) => ({ ...prev, license: !prev.license }))}
              style={{ fontWeight: "bold", cursor: "pointer", marginBottom: 4 }}
            >
              Lisans Türü {openPanels.license ? "▲" : "▼"}
            </div>
            {openPanels.license && (
              <Checkbox.Group
                options={[
                  { label: "Lisans", value: "plants" },
                  { label: "Önlisans", value: "onlisans_plants" },
                ]}
                value={licenseTypes}
                onChange={setLicenseTypes}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              />
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div
              onClick={() => setOpenPanels((prev) => ({ ...prev, type: !prev.type }))}
              style={{ fontWeight: "bold", cursor: "pointer", marginBottom: 4 }}
            >
              Tesis Türü {openPanels.type ? "▲" : "▼"}
            </div>
            {openPanels.type && (
              <Checkbox.Group
                options={plantTypes}
                value={selectedTypes}
                onChange={setSelectedTypes}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              />
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div
              onClick={() => setOpenPanels((prev) => ({ ...prev, source: !prev.source }))}
              style={{ fontWeight: "bold", cursor: "pointer", marginBottom: 4 }}
            >
              Kaynak Türü {openPanels.source ? "▲" : "▼"}
            </div>
            {openPanels.source && (
              <Checkbox.Group
                options={sourceTypes}
                value={selectedSources}
                onChange={setSelectedSources}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              />
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <strong>İl</strong>
            <AutoComplete
              options={cityOptions.map((city) => ({ value: city }))}
              placeholder="İl adı girin"
              value={selectedCity}
              onChange={(value) => {
                setSelectedCity(value);
                setSelectedDistrict(null);
              }}
              allowClear
              style={{ width: "100%" }}
              filterOption={(inputValue, option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
          </div>

          {selectedCity && (
            <div style={{ marginBottom: 12 }}>
              <strong>İlçe</strong>
              <AutoComplete
                options={districtOptions.map((d) => ({ value: d }))}
                placeholder="İlçe adı girin"
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                allowClear
                style={{ width: "100%" }}
                filterOption={(inputValue, option) =>
                  option.value.toLowerCase().includes(inputValue.toLowerCase())
                }
              />
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <strong>Kurulu Güç (MWe)</strong>
            <div style={{ display: "flex", gap: 8 }}>
              <InputNumber
                placeholder="Min"
                value={minCapacity}
                onChange={setMinCapacity}
                min={0}
                style={{ width: "50%" }}
              />
              <InputNumber
                placeholder="Max"
                value={maxCapacity}
                onChange={setMaxCapacity}
                min={0}
                style={{ width: "50%" }}
              />
            </div>
          </div>

          <Button type="primary" onClick={applyFilter} block>
            Filtrele
          </Button>
          <Button onClick={clearFilters} block style={{ marginTop: 8 }}>
            Filtreleri Temizle
          </Button>
        </div>
      )}

      {/* Uyarı mesajı */}
      {filteredPlants.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 999,
            fontSize: "14px",
            color: "#333",
          }}
        >
          Haritada gösterilecek veri bulunamadı. Lütfen filtreleme yapın.
        </div>
      )}

      <MapContainer center={[39, 35]} zoom={6} zoomControl={false} style={{ height: "100%", width: "100%" }}>
        <LayersControl position="bottomright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="CartoDB Positron">
            <TileLayer
              attribution="&copy; CartoDB"
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {filteredPlants
          .filter((p) => p.lat && p.lng)
          .map((plant) => (
            <CircleMarker
              key={plant.id}
              center={[plant.lat, plant.lng]}
              radius={8}
              pathOptions={{
                color: getColor(plant.source),
                fillColor: getColor(plant.source),
                fillOpacity: 0.7,
              }}
            >
              <Popup>
                <b>{plant.name}</b><br />
                {plant.city}, {plant.district}<br />
                Tesis Türü: {plant.plant_type}<br />
                Kaynak Türü: {plant.source}<br />
                Lisans Durumu: {plant.license_status || "Bilinmiyor"}<br />
                Kurulu Güç: {plant.capacity_mwe} MWe
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;