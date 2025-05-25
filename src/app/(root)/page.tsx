import Link from 'next/link'

const Page = () => {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <h2>Home Page</h2>
      <Link
        href='/auth/login'
        className='flex items-center gap-2 text-blue-500 hover:underline'
        data-slot='link'
      >
        Go to Login
      </Link>
    </div>
  )
}

export default Page
