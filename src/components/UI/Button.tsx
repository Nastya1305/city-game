import { FC } from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   icon?: string,
   small?: boolean
}


const Button: FC<ButtonProps> = ({ children, className, icon, small = false, ...props }) => {
   return (
      <button {...props}
         className={
            `${small ? 'w-8 h-8' : 'py-2 px-4'} 
            rounded bg-violet-600 hover:bg-violet-800 text-base font-medium
            text-white flex justify-center items-center focus:outline-violet-900 
            ${className}`
         }
      >
         {!small && children}
         {icon && <img src={icon} alt="Отправить сообщение" />}
      </button>
   )
}



export default Button;