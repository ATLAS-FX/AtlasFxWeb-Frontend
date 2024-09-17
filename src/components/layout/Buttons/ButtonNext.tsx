import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

interface ButtonNextProps {
  title: string
  classPlus?: string
  disabled?: boolean
  loading?: boolean
  func: () => void
}

const ButtonNext: React.FC<ButtonNextProps> = ({
  title,
  classPlus,
  disabled,
  loading,
  func
}) => {
  return (
    <Button
      className={cn(
        'min-w-32 rounded-md bg-primary-default p-5 text-base transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-hover hover:text-system-neutro',
        classPlus
      )}
      disabled={disabled}
      onClick={func}
    >
      {loading ? (
        <LoaderCircle className="size-8 animate-spin text-system-neutro transition-transform" />
      ) : (
        title
      )}
    </Button>
  )
}

export default ButtonNext
