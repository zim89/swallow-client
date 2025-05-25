'use client'

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ShallowIcon } from '@/shared/components/icons'
import { GoogleIcon } from '@/shared/components/icons/google-icon'
import { Button } from '@/shared/components/ui/button'
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
import { useRegister } from '../model'

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending, error } = useRegister()

  const onSubmit = (formData: AuthFormData) => {
    mutate(formData, {
      onError: () => {
        form.setError('root', { message: error?.message || 'Register failed' })
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
              Sign up
            </h1>
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

          {/* BUTTONS */}
          <div className='space-y-4 pt-6 xl:pt-8'>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending && <Loader2 className='animate-spin xl:size-6' />}
              Get started
            </Button>
            <Button type='button' variant={'secondary'} className='w-full'>
              <GoogleIcon />
              Sign up with Google
            </Button>
            <p className='flex justify-center gap-1 text-sm/none text-muted xl:text-base/none'>
              <span>Already have an account?</span>
              <Link
                href={appRoutes.auth.login.path}
                className='font-medium text-accent'
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
