import { useLayoutEffect, useRef, useState } from "react";

export default function useNow(updateInterval: number, enabled: boolean, onTick: (now: number) => void) {
   const onTickRef = useRef(onTick);
   onTickRef.current = onTick;
   const [now, setNow] = useState(Date.now());

   useLayoutEffect(() => {
      if (!enabled) {
         return;
      }

      setNow(Date.now());
      onTickRef.current?.(Date.now());

      const interval = setInterval(() => {
         setNow(Date.now());
         onTickRef.current?.(Date.now());
      }, updateInterval);

      return () => {
         clearInterval(interval);
      };
   }, [updateInterval, enabled]);
   return now;
}
