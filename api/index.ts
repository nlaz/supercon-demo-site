const headers = { Authorization: `Bearer ${process.env.API_KEY}` };

const baseUrl = "https://api.evenings.co";

export const fetchStatus = () =>
  fetch(baseUrl + "/api/streams/evenings/status", { headers }).then((res) =>
    res.json()
  );

export const fetchTracks = () =>
  fetch(baseUrl + "/api/stations/evenings/replays", { headers }).then((res) =>
    res.json()
  );
