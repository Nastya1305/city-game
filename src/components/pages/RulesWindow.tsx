import { FC } from 'react';
import Button from '../UI/Button'
import Window from '../UI/Window'
import { useNavigate } from 'react-router-dom';

interface RulesWindowProps {

}

const RulesWindow: FC<RulesWindowProps> = () => {
   const navigate = useNavigate();

   function startGame() {
      navigate('/game');
   }

   return (
      <Window className='w-[576px]'>
         <h1 className='text-center font-medium p-[17px] border-b-[3px] border-gray-100'>
            Игра в города на время
         </h1>

         <div className='p-6 text-sm text-gray-700 flex flex-col gap-y-6'>
            <p>Цель: Назвать как можно больше реальных городов России.</p>
            <div className='prose prose-li:text-sm prose-li:marker:text-gray-700'>
               <ul>
                  <li>Запрещается повторение городов.</li>
                  <li>Названий городов на твердый, мягкий знак и на "ё" нет. Также игра не знает городов на "ц" и "ы". Из-за этого мы пропускаем эти буквы и игрок должен назвать город на предыдущую букву.</li>
                  <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим.</li>
               </ul>
            </div>
            <Button className='self-center' onClick={startGame}>Начать игру</Button>
         </div>
      </Window>
   )
}


export default RulesWindow;