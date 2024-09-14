"use client";
import {
  GoogleMap,
  InfoWindow,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import "./style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Triangle, X } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};
export interface Property {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  price: string;
  image: string;
  link: string;
}

interface PropertyMapProps {
  options: Property[];
}

const PropertyMap = () => {
  const propertiesData: Property[] = [
    {
      id: 1,
      position: { lat: 37.7749, lng: -122.4194 },
      price: "€ 1,000,000",
      image: "https://picsum.photos/seed/picsum/200/",
      link: "/property/1",
    },
    {
      id: 2,
      position: { lat: 37.7749, lng: -200.433 },
      price: "€ 1,000,000",
      image: "https://picsum.photos/seed/picsum/200/",
      link: "/property/1",
    },
    {
      id: 3,
      position: { lat: 48.555, lng: -122.4194 },
      price: "€ 1,000,000",
      image: "https://picsum.photos/seed/picsum/200/",
      link: "/property/1",
    },
    {
      id: 4,
      position: { lat: 78.6767, lng: -122.4194 },
      price: "€ 1,000,000",
      image: "https://picsum.photos/seed/picsum/200/",
      link: "/property/1",
    },
    // Add more properties here
  ];

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "", // Add your Google Maps API key here
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && map && searchBoxRef.current) {
      const searchBox = new google.maps.places.SearchBox(searchBoxRef.current);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        searchBoxRef.current
      );

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          if (place.geometry && place.geometry.location) {
            const newCenter = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            setCenter(newCenter);
            map.panTo(newCenter);
          }
        }
      });
    }
  }, [isLoaded, map]);

  //this use effect code and imported only work if removed the commented code for InforWindow component below
  useEffect(() => {
    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check if the mutation type is 'childList'
        if (mutation.type === "childList") {
          // Get elements with the class names 'gm-style-iw gm-style-iw-c'
          const targetElement = document.getElementsByClassName(
            "gm-style-iw gm-style-iw-c"
          );

          if (targetElement.length > 0) {
            // Convert the HTMLCollection to an array for iteration
            const iteratedElement = Array.from(targetElement);

            iteratedElement.forEach((el) => {
              // Check if the parent node does not already have the 'custom-parent' class
              if (
                !(el.parentNode as Element)?.classList.contains("custom-parent")
              ) {
                // Create a new div with the 'custom-parent' class
                const wrapper = document.createElement("div");
                wrapper.appendChild(el.cloneNode(true));
                wrapper.className = "custom-parent";
                // Replace the original element with the new wrapped element
                el?.parentNode?.replaceChild(wrapper, el);
              }
            });
          }
        }
      });
    });

    // Start observing the document body for changes in the child elements
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Disconnect the observer when the component is unmounted to avoid memory leaks
    return () => {
      observer.disconnect();
    };
  }, []);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setSelectedProperty(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [overlayRef]);

  const handleProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  const handleCloseButton = useCallback(() => {
    setSelectedProperty(null);
  }, []);
  return (
    <div className="w-full">
      {isLoaded ? (
        <div>
          <input
            ref={searchBoxRef}
            type="text"
            placeholder="Search for places"
            className="absolute top-4 left-4 z-10 p-2 border border-gray-300 rounded"
          />
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={(map) => setMap(map)}
          >
            {propertiesData.map((property) => (
              <OverlayView
                key={property.id}
                position={property.position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <button
                  className="min-w-[126px] cursor-pointer h-9 rounded-3xl py-[10px] px-[14px] bg-white border border-neutral_25 flex justify-center items-center"
                  onClick={() => handleProperty(property)}
                >
                  <p className="text-neutral-600 font-medium text-sm leading-4 text-center">
                    {property.price}
                  </p>
                </button>
              </OverlayView>
            ))}

            {selectedProperty && (
              <OverlayView
                position={selectedProperty.position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="custom-overlay" ref={overlayRef}>
                  <Card className="min-w-64 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Property Details
                      </CardTitle>
                      <button
                        onClick={handleCloseButton}
                        className="absolute right-0 -top-8 z-50 bg-white"
                      >
                        <X />
                      </button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        ${selectedProperty.price.toLocaleString()}
                      </div>
                    </CardContent>
                    {/* <div className="triangle-clip" /> */}
                    {/* <Triangle
                      className="absolute left-[0] -bottom-[1.2rem] fill-white stroke-white z-50 rotate-180"
                      strokeWidth={0.5}
                    /> */}
                  </Card>
                </div>
              </OverlayView>
            )}

            {/* {selectedProperty && (
              <InfoWindow
                position={selectedProperty.position}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <div>
                  <Card className="min-w-64 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Property Details
                      </CardTitle>
                      <button
                        onClick={() => setSelectedProperty(null)}
                        className="absolute right-0 -top-40 z-50 "
                      >
                        <X />
                      </button>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        ${selectedProperty.price.toLocaleString()}
                      </div>
                    </CardContent>
                    <Triangle
                      className="absolute right-[45%] -bottom-[1.2rem] fill-white stroke-white z-50 rotate-180"
                      strokeWidth={0.5}
                    />
                  </Card>
                </div>
              </InfoWindow>
            )} */}
          </GoogleMap>
        </div>
      ) : (
        <p className="text-center font-medium">Loading...</p>
      )}
    </div>
  );
};

export default memo(PropertyMap);
