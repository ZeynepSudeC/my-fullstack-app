// src/components/FloatingPanel.js
import React from "react";
import { Card, Checkbox, Button, AutoComplete } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./FloatingPanel.css";

const FloatingPanel = ({
  licenseTypes,
  selectedTypes,
  selectedSources,
  selectedCity,
  cityOptions,
  onLicenseChange,
  onTypeChange,
  onSourceChange,
  onCityChange,
  onApply,
  onClose,
}) => {
  return (
    <Card
      className="floating-panel"
      title="Filtreleme"
      extra={<CloseOutlined style={{ color: "white" }} onClick={onClose} />}
    >
      <div style={{ marginBottom: 16 }}>
        <strong>Lisans Türü</strong>
        <Checkbox.Group
          options={[
            { label: "Üretim Lisansı", value: "plants" },
            { label: "Önlisans", value: "onlisans_plants" },
          ]}
          value={licenseTypes}
          onChange={onLicenseChange}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>Tesis Türü</strong>
        <Checkbox.Group
          options={selectedTypes}
          value={selectedTypes}
          onChange={onTypeChange}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>Kaynak Türü</strong>
        <Checkbox.Group
          options={selectedSources}
          value={selectedSources}
          onChange={onSourceChange}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>İl Seçimi</strong>
        <AutoComplete
          options={cityOptions.map((city) => ({ value: city }))}
          placeholder="İl adı yaz..."
          value={selectedCity}
          onChange={onCityChange}
          allowClear
          style={{ width: "100%" }}
          filterOption={(inputValue, option) =>
            option.value.toLowerCase().includes(inputValue.toLowerCase())
          }
        />
      </div>

      <Button type="primary" block onClick={onApply}>
        Filtrele
      </Button>
    </Card>
  );
};

export default FloatingPanel;