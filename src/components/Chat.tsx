import { FC } from 'react';


interface ChatProps {

}


const Chat: FC<ChatProps> = ({ }) => {
   const citys = ['Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина', 'Гатчина',];
   return (
      <div className='h-full overflow-auto pt-10 pb-5 flex flex-col items-start gap-2 scrollbar'>
         {
            citys.map(sity =>
               <div className={`rounded-xl py-[6px] px-4 
               even:rounded-bl-none even:bg-violet-50
               odd:bg-violet-500 odd:self-end odd:rounded-br-none odd:text-white`}>
                  {sity}
               </div>
            )
         }
      </div>
   )
}



export default Chat;