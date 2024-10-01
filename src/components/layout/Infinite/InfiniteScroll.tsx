import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'

interface InfiniteScrollProps {
  // items: any[]
  isLoading: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  children: React.ReactNode
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  // items,
  isLoading,
  hasNextPage,
  fetchNextPage,
  children
}) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasNextPage && !isLoading) {
          fetchNextPage()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, hasNextPage, fetchNextPage])

  return (
    <div className="p-4">
      {children}

      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Carregando mais itens...</span>
        </div>
      )}

      {!hasNextPage && (
        <p className="mt-4 text-center text-gray-500">
          Todos os itens foram carregados!
        </p>
      )}
    </div>
  )
}

export default InfiniteScroll
