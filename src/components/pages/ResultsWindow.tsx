import { FC } from 'react';
import Button from '../UI/Button'
import Window from '../UI/Window'
import { useNavigate } from 'react-router-dom';
import { PlayerType, Results } from '../../types/types';

interface ResultsWindowProps {
   results: Results
}

const ResultsWindow: FC<ResultsWindowProps> = ({ results }) => {
   const navigate = useNavigate();

   function startGame() {
      navigate('/game');
   }

   return (
      <Window>
         <div className='text-xl p-10 flex flex-col items-center gap-8 text-center'>
            {
               results.winner === PlayerType.First
                  ? <p>Поздравляем тебя с победой!<br />
                     Твой противник не вспомнил нужный город!</p>
                  : <p>К сожалению твое время вышло!<br />
                     Твой противник победил!</p>
            }

            <p className={`font-medium text-3xl 
               ${results.winner === PlayerType.First ? 'text-green-600' : 'text-red-600'}`}
            >
               00:00
            </p>

            <p>
               Всего было перечислено городов: {results.totalListedCities}<br />
               {results.totalListedCities > 0 && 'Очень не плохой результат!'}
            </p>
            {
               results.lastCity &&
               <p>Последний город названный победителем<br />
                  <span className='font-medium'>{results.lastCity}</span>
               </p>
            }
            <Button onClick={startGame}>Начать новую игру</Button>
         </div>
      </Window>
   )
}


export default ResultsWindow;