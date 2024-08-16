
interface buttonProps {
  text: string
  color: 'red' | 'green' | 'gray' | 'slate' | 'blue' | 'yellow'
  className?: string
  onClick?: () => void;
  icon?: string
  textSize?: string
}

const BaseButton = (props: buttonProps) => {
  let btnColor

  switch (props.color) {
    case 'red': btnColor = 'bg-red-500 hover:bg-red-400'; break;
    case 'green': btnColor = 'bg-green-500 hover:bg-green-400'; break;
    case 'gray': btnColor = 'bg-gray-500 hover:bg-gray-400'; break;
    case 'slate': btnColor = 'bg-slate-500 hover:bg-slate-400'; break;
    case 'blue': btnColor = 'bg-blue-500 hover:bg-blue-400'; break;
    case 'yellow': btnColor = 'bg-yellow-500 hover:bg-yellow-400'; break;
    default: break;
  }

  return (
    <button onClick={props.onClick} className={`${btnColor} ${props.textSize || 'text-base'} duration-200 text-white px-2 py-1 rounded-md ${props.className}`}>
      {props.icon ? <i className={`fa-solid me-1.5 ${props.icon}`}></i> : null}
      <span>{props.text}</span>
    </button>
  )
}

export default BaseButton
