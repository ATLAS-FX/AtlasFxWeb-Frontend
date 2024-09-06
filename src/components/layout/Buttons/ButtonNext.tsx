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
      className={cn('w-6/12 rounded-xl py-6 text-base', classPlus)}
      disabled={disabled}
      onClick={func}
    >
      {loading ? (
        <LoaderCircle className="h-10 w-10 animate-spin text-white transition-transform" />
      ) : (
        title
      )}
    </Button>
  )
}

export default ButtonNext
