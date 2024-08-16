interface sidebarOptionType {
  onClick?: () => void
  icon: string
  text: string
  isActive?: boolean
}

const SidebarOption = (props: sidebarOptionType) => {
  return (
    <li onClick={props.onClick} className={`${props.isActive ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-200 dark:hover:bg-slate-700'} py-1.5 px-2 rounded-md flex items-center cursor-pointer`}>
      <i className={`fa-solid ${props.icon} w-8`}></i>
      <span>{props.text}</span>
    </li>
  )
}

export default SidebarOption