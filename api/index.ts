const headers = { Authorization: `Bearer ${process.env.API_KEY}` };

const baseUrl = "https://api.evenings.co";

export const fetchStatus = () =>
  fetch(baseUrl + "/v1/streams/evenings/status", { headers }).then((res) =>
    res.json()
  );

export const fetchTracks = () =>
  fetch(baseUrl + "/v1/stations/evenings/broadcasts", { headers }).then((res) =>
    res.json()
  );
