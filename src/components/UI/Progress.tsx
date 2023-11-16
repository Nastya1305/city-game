import { FC } from 'react';

interface ProgressProps {

}


const Progress: FC<ProgressProps> = ({ }) => {
   return (
      <>
         <label htmlFor="progress" className='hidden'>Время на ответ</label>
         <progress id="progress" value="35" max="100"
            className='w-full progress'
         />
      </>
   )
}



export default Progress;