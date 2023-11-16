import { FC } from 'react';
import Window from '../UI/Window'
import Input from '../UI/Input';
import SendMessageIcon from "/src/assets/send-message.svg";
import Chat from '../Chat';
import Progress from '../UI/Progress';

interface GameWindowProps {

}

const GameWindow: FC<GameWindowProps> = () => {
   return (
      <Window className='w-[576px]'>
         <div className='flex justify-between p-[17px] border-gray-100 '>
            <p>Сейчас ваша очередь</p>
            <p className='text-xl font-medium'>01:59</p>
         </div>
         <Progress></Progress>

         <div className='h-80 w-full px-4 flex flex-col gap-5'>
            <Chat/>
            <p className='text-center text-sm text-gray-400'>Всего перечислено городов: 11</p>

            {/* <div className='h-80 w-full px-4 pt-10 pb-5 text-gray-400 text-sm flex justify-center items-center'>
               Первый участник вспоминает города...
            </div> */}
         </div>

         <Input
            icon={SendMessageIcon}
            placeholder='Напишите любой город, например: Где вы живете?'
         />
      </Window>
   )
}


export default GameWindow;