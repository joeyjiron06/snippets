import { useRef, useState } from 'react'

type Props = React.PropsWithChildren

export default function PreComponent({ children }: Props) {
  const snippetRef = useRef<HTMLPreElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [hasBeenCopiedRecently, setHasBeenCopiedRecently] =
    useState<boolean>(false)

  const copyClicked = async () => {
    try {
      const snippet = snippetRef.current
      const snippetText = snippet?.innerText ?? ''
      await navigator.clipboard.writeText(snippetText)

      setHasBeenCopiedRecently(true)

      const currentTimeout = timeoutRef.current
      if (currentTimeout) {
        clearTimeout(currentTimeout)
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        setHasBeenCopiedRecently(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <div className='group relative'>
      <pre ref={snippetRef}>{children}</pre>

      <button
        className='btn-outline btn-sm absolute right-2 top-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100'
        aria-label='copy'
        onClick={copyClicked}
        data-tooltip={hasBeenCopiedRecently ? 'Copied!' : 'Copy to clipboard'}
        data-placement='left'>
        {hasBeenCopiedRecently ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-5'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-5 text-green-500'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m4.5 12.75 6 6 9-13.5'
      />
    </svg>
  )
}
