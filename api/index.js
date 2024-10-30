const headers = { Authorization: `Bearer ${process.env.API_KEY}` };

const baseUrl = "https://api.evenings.co";

export const fetchStatus = (channelId) =>
  fetch(`${baseUrl}/v1/streams/${channelId}/status`, { headers }).then((res) => res.json());

export const fetchChannels = () =>
  fetch(`${baseUrl}/v1/channels`, { headers }).then((res) => res.json());

export const fetchTracks = () =>
  fetch(baseUrl + "/v1/stations/supercon/tracks", { headers }).then((res) => res.json());
