import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

interface TwoFactorAuthValidatorProps {
  className?: string
  codeLength: number
  onValidCode: (code: string) => void
}

const TwoFactorAuthValidator: React.FC<TwoFactorAuthValidatorProps> = ({
  codeLength,
  onValidCode,
  className
}) => {
  const [code, setCode] = useState<string>('')
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, codeLength)
  }, [codeLength])

  const handleInputChange = (index: number, value: string) => {
    const updatedCode = code.substr(0, index) + value + code.substr(index + 1)
    setCode(updatedCode)

    if (updatedCode.length === codeLength) {
      onValidCode(updatedCode)
    } else if (updatedCode.length < codeLength) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleBackspace = (index: number) => {
    if (index > 0) {
      const updatedCode = code.slice(0, index - 1) + code.slice(index)
      setCode(updatedCode)
      inputRefs.current[index - 1]?.focus()
    } else {
      setCode('')
    }
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: codeLength }).map((_, index) => (
        <input
          className={cn(
            'security h-12 w-12 rounded-sm bg-[#EFEFEF] text-center shadow-md',
            className
          )}
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="password"
          maxLength={1}
          value={code[index] || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              e.preventDefault()
              handleBackspace(index)
            }
          }}
        />
      ))}
    </div>
  )
}

export default TwoFactorAuthValidator
