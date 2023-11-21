import { useState } from "react";
import useNow from "./useNow";


export default function useCountdownTimer(allTime: number, whenTimeIsUp: () => void) {
   const [startAt, setStartAt] = useState<number | null>(Date.now());

   const now = useNow(1000, startAt !== null, (now) => {
      if (startAt && allTime - (now - startAt) < 0) {
         setStartAt(null);
         whenTimeIsUp();
      }
   });

   const msToRestart = startAt ? allTime - (now - startAt) : 0;

   function restartTimer() {
      setStartAt(Date.now())
   }

   return { restartTimer, msToRestart }
}