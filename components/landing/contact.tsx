'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  message: z.string().min(1, 'El mensaje es requerido'),
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    toast.success('Mensaje enviado correctamente')
  }
  return (
    <section className='py-16 px-4 md:px-10 lg:py-24'>
      <div className='mx-auto max-w-5xl'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          Contacto
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-8 grid gap-6 md:grid-cols-2'
      >
        <div>
          <Label htmlFor='name'>Nombre</Label>
          <Input id='name' {...register('name')} />
          {errors.name && (
            <p className='text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='email'>Correo electrónico</Label>
          <Input id='email' {...register('email')} />
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='message'>Mensaje</Label>
          <Textarea id='message' {...register('message')} />
          {errors.message && (
            <p className='text-sm text-red-500'>{errors.message.message}</p>
          )}
        </div>
        <Button type='submit' className='w-full'>
          Enviar
        </Button>
      </form>
    </section>
  )
}

export default Contact
