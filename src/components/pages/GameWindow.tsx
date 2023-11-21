import { FC, useEffect, useState } from 'react';
import Window from '../UI/Window'
import Input from '../UI/Input';
import SendMessageIcon from "/src/assets/send-message.svg";
import Chat from '../Chat';
import Progress from '../UI/Progress';
import useCitiesGame from '../../hooks/useCitiesGame';
import useNow from '../../hooks/useNow';
import getRandomInt from '../../utils/getRandom';
import formatTime from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import { PlayerType, Results } from '../../types/types';

interface GameWindowProps {
   onFinishGame: (results: Results) => void
}


const GameWindow: FC<GameWindowProps> = ({ onFinishGame }) => {
   const [errorMessage, setErrorMessage] = useState<string>("");
   const { listedCities, giveAnswer, getAnswer } = useCitiesGame();
   const [turn, setTurn] = useState<PlayerType>(PlayerType.First);
   const navigate = useNavigate();

   const [startAt, setStartAt] = useState<number | null>(null);

   const restartTimeout = 15000;

   const now = useNow(1000, startAt, (now) => {
      if (startAt && restartTimeout - (now - startAt) < 0) {
         setStartAt(null);
         onFinishGame({
            winner: turn === PlayerType.First ? PlayerType.Second : PlayerType.First,
            totalListedCities: listedCities.length,
            lastCity: listedCities[listedCities.length - 1]
         });
         navigate('/results');
      }
   });

   const msToRestart = startAt ? restartTimeout - (now - startAt) : 0;

   useEffect(() => setStartAt(Date.now()), []);

   function submitValue(inputAnswer: string): boolean {
      try {
         getAnswer(inputAnswer);
         setErrorMessage('');

         setTurn(PlayerType.Second);
         setStartAt(Date.now());
         setTimeout(() => { //add clear
            giveAnswer(inputAnswer); //а если не найдет

            setTurn(PlayerType.First);
            setStartAt(Date.now());
         }, getRandomInt(1, restartTimeout * 1.3));
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
         <Progress max={restartTimeout} value={restartTimeout - msToRestart} />

         <div className='h-80 w-full px-4 flex flex-col gap-5'>
            {
               listedCities.length > 0 ?
                  <>
                     <Chat listedCities={listedCities} />
                     <p className='text-center text-sm text-gray-400'>
                        {
                           errorMessage ? errorMessage :
                              'Всего перечислено городов: ' + listedCities?.length
                        }
                     </p>
                  </>
                  : //добавить сообщение об ошибке если города еще не названы
                  <div className='h-80 w-full px-4 pt-10 pb-5 text-gray-400 text-sm flex justify-center items-center'>
                     Первый участник вспоминает города...
                  </div>
            }
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


