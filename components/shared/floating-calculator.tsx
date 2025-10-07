'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Calculator, CopyIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

export function FloatingCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [operationDisplay, setOperationDisplay] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
      setOperationDisplay(`${inputValue} ${getOperationSymbol(nextOperation)}`)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
      setOperationDisplay(`${newValue} ${getOperationSymbol(nextOperation)}`)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const getOperationSymbol = (op: string): string => {
    switch (op) {
      case '+':
        return '+'
      case '-':
        return '-'
      case '×':
        return '×'
      case '÷':
        return '÷'
      default:
        return op
    }
  }

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display)
      const newValue = calculate(previousValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setOperationDisplay('')
      setWaitingForOperand(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setOperationDisplay('')
    setWaitingForOperand(false)
  }

  const handleCopyResult = () => {
    navigator.clipboard.writeText(display)
    setIsCopied(true)
    toast.success('Resultado copiado al portapapeles')
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='lg'
          className='fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg'
          aria-label='Calculadora'
        >
          <Calculator className='h-6 w-6' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Calculadora</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          {/* Display */}
          <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-right min-h-[60px] flex flex-col justify-center'>
            {operationDisplay && (
              <div className='text-sm text-gray-600 dark:text-gray-400 font-mono mb-1'>
                {operationDisplay}
              </div>
            )}
            <div className='text-2xl font-mono'>{display}</div>
             <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger asChild>
                   <CopyIcon 
                     className='w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer' 
                     onClick={handleCopyResult} 
                   />
                 </TooltipTrigger>
                 <TooltipContent className='bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm shadow-lg'>
                   Copiar resultado
                 </TooltipContent>
               </Tooltip>
             </TooltipProvider>
          </div>

          {/* Buttons */}
          <div className='grid grid-cols-4 gap-2'>
            <Button
              onClick={handleClear}
              variant='outline'
              className='col-span-2'
            >
              AC
            </Button>
            <Button onClick={() => handleOperation('÷')} variant='outline'>
              ÷
            </Button>
            <Button onClick={() => handleOperation('×')} variant='outline'>
              ×
            </Button>

            <Button onClick={() => handleNumber('7')} variant='outline'>
              7
            </Button>
            <Button onClick={() => handleNumber('8')} variant='outline'>
              8
            </Button>
            <Button onClick={() => handleNumber('9')} variant='outline'>
              9
            </Button>
            <Button onClick={() => handleOperation('-')} variant='outline'>
              -
            </Button>

            <Button onClick={() => handleNumber('4')} variant='outline'>
              4
            </Button>
            <Button onClick={() => handleNumber('5')} variant='outline'>
              5
            </Button>
            <Button onClick={() => handleNumber('6')} variant='outline'>
              6
            </Button>
            <Button onClick={() => handleOperation('+')} variant='outline'>
              +
            </Button>

            <Button onClick={() => handleNumber('1')} variant='outline'>
              1
            </Button>
            <Button onClick={() => handleNumber('2')} variant='outline'>
              2
            </Button>
            <Button onClick={() => handleNumber('3')} variant='outline'>
              3
            </Button>
            <Button
              onClick={handleEquals}
              variant='default'
              className='row-span-2'
            >
              =
            </Button>

            <Button
              onClick={() => handleNumber('0')}
              variant='outline'
              className='col-span-3'
            >
              0
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
