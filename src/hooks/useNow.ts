import { useLayoutEffect, useRef, useState } from "react";

export default function useNow(updateInterval: number, enabled: number | null, cb: (now: number) => void) {
   const cbRef = useRef(cb);
   cbRef.current = cb;
   const [now, setNow] = useState(Date.now());

   useLayoutEffect(() => {
      if (!enabled) {
         return;
      }

      setNow(Date.now());
      cbRef.current?.(Date.now());

      const interval = setInterval(() => {
         setNow(Date.now());
         cbRef.current?.(Date.now());
      }, updateInterval);

      return () => {
         clearInterval(interval);
      };
   }, [updateInterval, enabled]);
   return now;
}
