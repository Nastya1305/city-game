import { FC } from 'react';


interface WindowProps extends React.HTMLProps<HTMLDivElement> {

}


const Window: FC<WindowProps> = ({ children, className }) => {
   return (
      <div className={'bg-white max-w-xl rounded-3xl flex flex-col shadow ' + className}>
         {children}
      </div>
   )
}



export default Window;