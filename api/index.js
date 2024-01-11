const headers = { Authorization: `Bearer ${process.env.API_KEY}` };

const baseUrl = "https://api.evenings.co";

export const fetchStatus = () =>
  fetch(baseUrl + "/v1/streams/Kwekx1JG0/status", { headers }).then((res) =>
    res.json()
  );

export const fetchTracks = () =>
  fetch(baseUrl + "/v1/stations/garage/tracks", { headers }).then((res) =>
    res.json()
  );
