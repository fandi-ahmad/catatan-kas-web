
interface buttonProps {
  text: string
  color: 'green' | 'red'
  className?: string
  onClick?: () => void;
}

const BaseButton = (props: buttonProps) => {
  return (
    <button onClick={props.onClick} className={`${props.color == 'green' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'} duration-200 text-white px-3 py-1 rounded-md ${props.className}`}>
      <i className="fa-solid fa-plus"></i>
      <span className="ms-1.5">{props.text}</span>
    </button>
  )
}

export default BaseButton
