import { FC } from 'react';
import Button from './UI/Button'
import Window from './UI/Window'

interface RulesWindowProps {

}

const RulesWindow: FC<RulesWindowProps> = () => {
   return (
      <Window className='w-[576px]'>
         <h1 className='text-center font-medium p-[17px] border-b-[3px] border-gray-100'>
            Игра в города на время
         </h1>

         <div className='p-6 text-sm text-gray-700 flex flex-col gap-y-6'>
            <p>Цель: Назвать как можно больше реальных городов.</p>
            <div className='prose prose-li:text-sm prose-li:marker:text-gray-700'>
               <ul>
                  <li>Запрещается повторение городов.</li>
                  <li>Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.</li>
                  <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим</li>
               </ul>
            </div>
            <Button className='self-center'>Начать игру</Button>
         </div>
      </Window>
   )
}


export default RulesWindow;