import { FC } from 'react';

interface ProgressProps {
   value: number,
   max: number
}


const Progress: FC<ProgressProps> = ({ value, max }) => {
   return (
      <>
         <label htmlFor="progress" className='hidden'>Время на ответ</label>
         <progress id="progress" value={value} max={max}
            className='w-full progress'
         />
      </>
   )
}



export default Progress;