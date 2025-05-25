import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex h-screen items-center justify-center xl:bg-background-accent'>
      {children}
    </main>
  )
}
export default Layout
