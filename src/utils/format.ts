

export default function formatTime(ms: number): string {
   const mins = ("0" + Math.floor(ms / 60000)).slice(-2);
   const sec = ("0" + Math.floor(ms % 60000 / 1000)).slice(-2);
   return `${mins}:${sec}`;
}