export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmFpZ2F0byIsImEiOiJja3M5M3Y4cnQxZ3FkMzFzM25haWEwNnpvIn0.lz9pZxV0uNt8tfy0g173ww";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/raigato/cks947bxc2q8q18p1y2beiefu",
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((location) => {
    const element = document.createElement("div");
    element.className = "marker";

    new mapboxgl.Marker({
      element,
      anchor: "bottom",
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 25,
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
      .addTo(map);

    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
