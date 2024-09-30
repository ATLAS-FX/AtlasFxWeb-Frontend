import { toast } from '@/components/ui/use-toast'
import { ErrorResponse } from '@/types/ErrorResponse'

export const handleCopyClick = (
  value: string,
  textSuccess: string,
  textError: string
) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast({
        variant: 'success',
        title: textSuccess,
        description: ''
      })
    })
    .catch(({ response }: ErrorResponse) => {
      toast({
        variant: 'destructive',
        title: textError,
        description: response?.data?.error
      })
    })
}
