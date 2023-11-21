import { FC, useEffect, useRef, useState } from 'react';
import Window from '../UI/Window'
import Input from '../UI/Input';
import SendMessageIcon from "/src/assets/send-message.svg";
import Chat from '../Chat';
import Progress from '../UI/Progress';
import useCitiesGame from '../../hooks/useCitiesGame';
import getRandomInt from '../../utils/getRandom';
import formatTime from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import { PlayerType, Results } from '../../types/types';
import useCountdownTimer from '../../hooks/useCountdownTimer';

interface GameWindowProps {
   onFinishGame: (results: Results) => void
}


const GameWindow: FC<GameWindowProps> = ({ onFinishGame }) => {
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [turn, setTurn] = useState<PlayerType>(PlayerType.First);
   const { listedCities, giveAnswer, getAnswer } = useCitiesGame();

   //для общего отсчета времени
   const allTime = 120000;
   const { restartTimer, msToRestart } = useCountdownTimer(allTime, getResults);

   //для ожидания ответа второго игрока
   const timerId = useRef<ReturnType<typeof setInterval>>();
   useEffect(() => {
      return () => clearTimeout(timerId.current);
   }, []);

   const navigate = useNavigate();


   function getResults() {
      onFinishGame({
         winner: turn === PlayerType.First ? PlayerType.Second : PlayerType.First,
         totalListedCities: listedCities.length,
         lastCity: listedCities[listedCities.length - 1]
      });
      navigate('/results');
   }

   function submitValue(inputAnswer: string): boolean {
      try {
         setErrorMessage('');
         getAnswer(inputAnswer);

         setTurn(PlayerType.Second);
         restartTimer();

         const timeForSecondPlayerToThink = getRandomInt(1, allTime * 1.3);
         timerId.current = setTimeout(() => {
            if (giveAnswer(inputAnswer)) {
               setTurn(PlayerType.First);
               restartTimer();
            }
         }, timeForSecondPlayerToThink);

         return true;
      } catch (e) {
         if (e instanceof Error) {
            setErrorMessage(e.message);
         }
         return false;
      }
   }

   return (
      <Window className='w-[576px]'>
         <div className='flex justify-between p-[17px] border-gray-100 '>
            <p>
               {
                  turn === PlayerType.First
                     ? 'Сейчас ваша очередь'
                     : 'Сейчас очередь соперника'
               }
            </p>
            <p className='text-xl font-medium'>{formatTime(msToRestart)}</p>
         </div>
         <Progress max={allTime} value={allTime - msToRestart} />

         <div className='h-80 w-full px-4 flex flex-col gap-5'>
            <>
               {
                  listedCities.length > 0 ?
                     <Chat listedCities={listedCities} />
                     :
                     <div className='h-80 w-full px-4 pt-10 pb-5 text-gray-400 text-sm flex justify-center items-center'>
                        Первый участник вспоминает города...
                     </div>
               }
               <p className='text-center text-sm text-gray-400'>
                  {
                     errorMessage ? errorMessage 
                     : listedCities.length > 0 ? 'Всего перечислено городов: ' + listedCities.length 
                        : null
                  }
               </p>
            </>
         </div>

         <Input
            icon={SendMessageIcon}
            placeholder={
               turn === PlayerType.First
                  ? 'Напишите любой город, например: Где вы живете?'
                  : 'Ожидаем ответа соперника...'
            }
            submitValue={submitValue}
            disabled={turn === PlayerType.Second}
            autoFocus
         />
      </Window>
   )
}


export default GameWindow;


