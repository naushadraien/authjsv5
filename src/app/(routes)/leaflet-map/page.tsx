"use client";
import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngBounds, divIcon } from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";

interface Property {
  id: string;
  lat: number;
  lng: number;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap: React.FC<PropertyMapProps> = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const properties: Array<Property> = [
    {
      address: "hello",
      bathrooms: 20,
      bedrooms: 30,
      id: "1",
      lat: 40.72371,
      lng: -73.95097,
      price: 2000,
      sqft: 30,
    },
    {
      address: "hello12",
      bathrooms: 20,
      bedrooms: 30,
      id: "2",
      lat: 41.48199,
      lng: -81.79819,
      price: 3000,
      sqft: 30,
    },
    {
      address: "hello",
      bathrooms: 10,
      bedrooms: 20,
      id: "3",
      lat: 41.72059,
      lng: -87.70172,
      price: 4000,
      sqft: 30,
    },
    {
      address: "hello",
      bathrooms: 20,
      bedrooms: 30,
      id: "4",
      lat: 33.93113,
      lng: -117.54866,
      price: 5000,
      sqft: 30,
    },
  ];

  const { center, zoom } = useMemo(() => {
    if (properties.length === 0) {
      return { center: [0, 0] as LatLngExpression, zoom: 2 };
    }

    const bounds = new LatLngBounds(properties.map((p) => [p.lat, p.lng]));

    return {
      center: bounds.getCenter(),
      zoom: 10,
    };
  }, []);

  const createCustomIcon = (price: number) => {
    return divIcon({
      html: `<div class="bg-blue-500 text-white px-2 py-1 rounded-full shadow-md text-sm">$${price.toLocaleString()}</div>`,
      className: "custom-icon",
      iconSize: [80, 30],
      iconAnchor: [40, 15],
    });
  };

  const CustomPopup: React.FC<{ property: Property }> = ({ property }) => (
    <Card className="min-w-64 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">
          ${property.price.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">{property.address}</div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="font-semibold">{property.bedrooms}</div>
            <div className="text-muted-foreground">Beds</div>
          </div>
          <div>
            <div className="font-semibold">{property.bathrooms}</div>
            <div className="text-muted-foreground">Baths</div>
          </div>
          <div>
            <div className="font-semibold">{property.sqft}</div>
            <div className="text-muted-foreground">Sq Ft</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative h-[600px] w-full">
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map((property) => (
          <Marker
            position={[property.lat, property.lng]}
            key={property.id}
            icon={createCustomIcon(property.price)}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup offset={[0, -10]} className="min-w-64">
              <CustomPopup property={property} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
