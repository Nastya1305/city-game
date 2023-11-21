import { FC, useEffect, useRef } from 'react';


interface ChatProps {
   listedCities: string[]
}


const Chat: FC<ChatProps> = ({ listedCities }) => {
   const messagesEndRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(scrollToBottom, [listedCities]);

   return (
      <div className='h-full overflow-auto pt-10 pb-5 flex flex-col items-start gap-2 scrollbar'>
         {
            listedCities.map((sity, index) =>
               <div className={`rounded-xl py-[6px] px-4 
               even:rounded-bl-none even:bg-violet-50
               odd:bg-violet-500 odd:self-end odd:rounded-br-none odd:text-white`}
                  key={index}
               >
                  {sity}
               </div>
            )
         }
         <div ref={messagesEndRef} />
      </div>
   )
}



export default Chat;