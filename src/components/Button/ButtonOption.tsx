interface buttonOption {
  text: string,
  isActive?: boolean | false
  onClick?: () => void
}
const ButtonOption = (props: buttonOption) => {
  return (
    <button onClick={props.onClick} className={`rounded-full border py-1 ${props.isActive ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-800 dark:border-white'} `}>
      {props.text}
    </button>
  )
}

export default ButtonOption