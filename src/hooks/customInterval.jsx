/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useCallback } from "react";

function useCustomInterval(callback, interval) {

  const running = useRef(true)

  const initialTime = useRef(0)
  const currentTime = useRef(0)
  const renderTriggered = useRef(false)

  const startInterval = useCallback(() => {
    if (renderTriggered.current) {
      return
    }
    initialTime.current = performance.now()
    setTimeout(intervalFunc, interval)

    function intervalFunc() {
      if (!running.current) {
        return
      }

      currentTime.current = performance.now()
      const deltaTime = currentTime.current - initialTime.current
      const drift = Math.max(0, deltaTime - interval)
      const newInterval = interval - drift

      initialTime.current = currentTime.current

      callback()
      

      setTimeout(intervalFunc, interval === 0 ? interval : newInterval)


    }
  }, [callback, interval])

  function stopInterval() {
    running.current = false
  }

  // useEffect(() => startInterval(), [startInterval])

  return {startInterval, stopInterval}
}

export default useCustomInterval;
