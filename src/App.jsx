import { useEffect, useRef, useState } from "react";
import useCustomInterval from "./hooks/customInterval";
import balloon from "./assets/floating-balloon-isolated.png"
import data from "./data.json"
import "./style/App.css"


function App() {

  const isReRendered = useRef(false)

  const specificDate = useRef()
  const currentTime = useRef()
  const d1 = useRef()
  const d2 = useRef()
  const d3 = useRef()

  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()

  const [isBirthday, setIsBirthday] = useState(false)

  const interval = useRef(useCustomInterval(timeCalculator, 1000))

  useEffect(() => {
    if (isReRendered.current) {
      return
    }

    specificDate.current = new Date(data.year, data.monthIndex, data.date, 0, 0, 0) / 1000
    currentTime.current = Date.now() / 1000
    // eslint-disable-next-line react-hooks/set-state-in-effect
    specificDate.current <= currentTime.current ? setIsBirthday(true) : setIsBirthday(false)
    d1.current = specificDate.current - currentTime.current
    setDays(Math.floor(d1.current / 86400))
    d2.current = d1.current % 86400
    setHours(Math.floor(d2.current / 3600))
    d3.current = d2.current % 3600
    setMinutes(Math.floor(d3.current / 60))
    setSeconds(Math.floor(d3.current % 60))

    // setTimeout(() => console.log(interval.current.startInterval, interval.current.stopInterval), 5000)
    interval.current.startInterval()
    isReRendered.current = true

    return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return interval.current.stopInterval();
    }
  }, [])

  function timeCalculator() {

    currentTime.current += 1
    d1.current = specificDate.current - currentTime.current
    setDays(Math.floor(d1.current / 86400))
    d2.current = d1.current % 86400
    setHours(Math.floor(d2.current / 3600))
    d3.current = d2.current % 3600
    setMinutes(Math.floor(d3.current / 60))
    setSeconds(Math.floor(d3.current % 60))

    specificDate.current <= currentTime.current ? setIsBirthday(true) : setIsBirthday(false)
  }

  /* useEffect(() => {
    return () => stopTimer()
  }, [stopTimer]) */
  return <>
    <div className={isBirthday ? "balloon-container" : "hidden"}><img className="balloon" src={balloon} /></div>
    <div className={isBirthday ? "balloon-container" : "hidden"}><img className="balloon" src={balloon} /></div>
    <div className="container">
      <div className="card">
        {!isBirthday ? <>
          <span className="user">{data.name}'s birthday is in:</span>
          <div className="timer">
            <div className="items">
              <span className="time">{days}</span>
              <span className="text">Days </span></div>
            <div className="items">
              <span className="time">{hours}</span>
              <span className="text">Hours </span>
            </div>
            <div className="items">
              <span className="time">{minutes}</span>
              <span className="text">Minutes</span></div>
            <div className="items">
              <span className="time">{seconds}</span>
              <span className="text">Seconds</span>
            </div>
          </div>

        </> : <span className="user">Happy Birthday {data.name}!</span>}
      </div>
    </div>
  </>
}

export default App;
