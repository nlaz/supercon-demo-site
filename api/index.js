const headers = { Authorization: `Bearer ${process.env.API_KEY}` };

const baseUrl = "https://api.evenings.co";

export const fetchStatus = () =>
  fetch(baseUrl + "/v1/streams/lk5Qo55Ex/status", { headers }).then((res) =>
    res.json()
  );

export const fetchTracks = () =>
  fetch(baseUrl + "/v1/stations/supercon/tracks", { headers }).then((res) =>
    res.json()
  );
