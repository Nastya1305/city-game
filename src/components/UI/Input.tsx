import { FC, useRef } from 'react';
import Button from './Button';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   icon: string,
   submitValue(value: string): boolean,
}


const Input: FC<InputProps> = ({ icon, submitValue, ...props }) => {
   const inputRef = useRef<HTMLInputElement>(null)

   return (
      <form className='m-4 relative'
         onSubmit={(e) => {
            e.preventDefault();
            if (inputRef.current) {
               if (submitValue(inputRef.current.value)) inputRef.current.value = '';
            }
         }}>
         <input type="text" {...props}
            className={`bg-gray-100 w-full py-[14px] pl-3 pr-14 rounded 
            placeholder:text-gray-700 focus:outline-gray-300 disabled:placeholder:text-gray-400`}
            ref={inputRef}
         />
         <Button small icon={icon}
            disabled={props.disabled}
            className='absolute right-2 bottom-1/2 translate-y-2/4 shadow-sm disabled:bg-gray-400'
         />
      </form>
   )
}



export default Input;