import { useState, useEffect } from "react"

function useAudioPlayer(id) {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [clickedTime, setClickedTime] = useState()
  const [speed, setSpeed] = useState(1)

  const resetPlayer = () => {
    setPlaying(false);
    setClickedTime(null);
    setSpeed(1);
    setCurrentTime(0);
    setDuration(0);
  }

  useEffect(() => {
    const audio = document.getElementById(id)

    if (audio) {
      // state setters wrappers
      const setAudioData = () => {
        setDuration(audio.duration)
        setCurrentTime(audio.currentTime)
        setSpeed(audio.playbackRate)
      }

      const setAudioTime = () => {
        setDuration(audio.duration)
        setCurrentTime(audio.currentTime)
      }

      // DOM listeners: update React state on DOM events
      audio.addEventListener("loadeddata", setAudioData)

      audio.addEventListener("timeupdate", setAudioTime)

      // React state listeners: update DOM on React state changes
      if (playing) {
        audio.play()
      } else {
        audio.pause()
      }

      if (speed && speed !== audio.playbackRate) {
        audio.playbackRate = speed
      }

      if (clickedTime && clickedTime !== currentTime) {
        audio.currentTime = clickedTime
        setClickedTime(null)
      }

      // effect cleanup
      return () => {
        audio.removeEventListener("loadeddata", setAudioData)
        audio.removeEventListener("timeupdate", setAudioTime)
      }
    }
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, clickedTime, speed])

  return {
    speed,
    currentTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setSpeed,
    resetPlayer,
  }
}

export default useAudioPlayer
