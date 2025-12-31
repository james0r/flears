import { useNavigate } from "react-router"

import { cn } from '~/utils'
import { MoveLeft } from 'lucide-react'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <button className={cn([
        'hover:scale-125',
        'transition-transform',
        'cursor-pointer'
      ])}
        onClick={() => {void navigate(-1)} }
        type="button"
      >
        <MoveLeft />
      </button>
    </>
  )
}
BackButton.displayName = "BackButton"

export default BackButton