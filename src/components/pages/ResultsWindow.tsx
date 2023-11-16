import { FC } from 'react';
import Button from '../UI/Button'
import Window from '../UI/Window'
import { useNavigate } from 'react-router-dom';

interface ResultsWindowProps {

}

const ResultsWindow: FC<ResultsWindowProps> = () => {
   const navigate = useNavigate();

   function startGame() {
      navigate('/game');
   }
   
   return (
      <Window>
         <div className='text-xl p-10 flex flex-col items-center gap-8 text-center'>
            <p>К сожалению твое время вышло!<br />
               Твой противник победил!</p>
            <p className='font-medium text-3xl text-red-600'>00:00</p>
            <p>Всего было перечислено городов: 31<br />
               Очень не плохой результат!</p>
            <p>Последний город названный победителем<br />
               <span className='font-medium'>Москва</span>
            </p>
            <Button onClick={startGame}>Начать новую игру</Button>
         </div>
      </Window>
   )
}


export default ResultsWindow;