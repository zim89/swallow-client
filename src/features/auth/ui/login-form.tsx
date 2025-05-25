'use client'

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ShallowIcon } from '@/shared/components/icons'
import { GoogleIcon } from '@/shared/components/icons/google-icon'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { appRoutes } from '@/shared/constants'
import { AuthSchema, type AuthFormData } from '../lib'
import { useLogin } from '../model'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending, error } = useLogin()

  const onSubmit = (formData: AuthFormData) => {
    mutate(formData, {
      onError: () => {
        form.setError('root', { message: error?.message || 'Login failed' })
      },
    })
  }

  return (
    <div className='bg-background xl:rounded-3xl xl:px-[134px] xl:py-[59px] xl:shadow-[3px_5px_25px_0_rgba(0,0,0,0.15)]'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-[303px] space-y-6 bg-background xl:w-[528px] xl:space-y-8'
        >
          {/* HEADER */}
          <div className='space-y-6 text-center'>
            <ShallowIcon className='mx-auto block xl:size-[70px]' />
            <h1 className='text-3xl/none font-medium xl:text-4xl/none'>
              Sign in
            </h1>
            <p className='text-base/none text-muted xl:text-[22px]/none'>
              Welcome back! Please fill the fields below
            </p>
          </div>

          {/* FIELDS */}
          <div className='space-y-4 xl:space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      readOnly={isPending}
                      placeholder='Enter your email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='p-0'>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        readOnly={isPending}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <button
                      type='button'
                      onClick={() => setShowPassword(prev => !prev)}
                      className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-1 text-muted'
                    >
                      {showPassword ? (
                        <EyeOffIcon className='size-6' />
                      ) : (
                        <EyeIcon className='size-6' />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* REMEMBER ME */}
          <div className='flex items-center justify-between text-sm/none xl:text-lg/none'>
            <div className='flex cursor-pointer items-center gap-1'>
              <Checkbox id='remember' className='cursor-pointer' />
              <label htmlFor='remember' className='cursor-pointer'>
                Remember
              </label>
            </div>
            <Link
              href='#'
              className='font-medium text-accent xl:text-base/none'
            >
              Forgot password
            </Link>
          </div>

          {/* BUTTONS */}
          <div className='space-y-4'>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending && <Loader2 className='animate-spin xl:size-6' />}
              Get started
            </Button>
            <Button type='button' variant={'secondary'} className='w-full'>
              <GoogleIcon />
              Sign in with Google
            </Button>
            <p className='flex justify-center gap-1 text-sm/none text-muted xl:text-base/none'>
              <span>Don’t have an account?</span>
              <Link
                href={appRoutes.auth.register.path}
                className='font-medium text-accent'
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
