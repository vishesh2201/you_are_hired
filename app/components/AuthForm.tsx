"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { toast } from "sonner"
import FormField from "@/components/FormField"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { Form } from "@/components/ui/form"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}

const AuthForm = ({type}: {type: FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type === 'sign-up')
        {
          const{name, email, password} = values;
          const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
          const result = await signUp({
            uid: userCredentials.user.uid,
            name: name!,
            email,
            password,
          })
          if(!result?.success){
            toast.error(result?.message);
            return;
          }
          toast.success('Account created. Please sign in')
          router.push('/sign-in');
        }
        else{
          const {email, password } = values;
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const idToken = await userCredential.user.getIdToken();
          if(!idToken){
            toast.error('Sign in failed')
            return;
          }
          await signIn({
            email, idToken
          })
          toast.success("Signed in successfully");
          router.push('/');
        }
    }
    catch(e){
      console.log(e);
      toast.error(`${e}`);
    }
  }

  const isSignIn = type === 'sign-in'

  return (
    <div className="lg:min-w-[566px] max-w-[90%] mx-auto">
  <div className="flex flex-col gap-6 card px-6 py-6 items-center overflow-auto max-h-[80vh]">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="./logo.svg" alt="logo" height={25} width={25}/>
          <h2 className="text-primary-100">linkedOut</h2>
        </div>
        <h3 className="text-[#C5C6C7] text-center -mb-4">Practice job interviews with AI</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form items-center">
          {!isSignIn && (<FormField control={form.control} name="name" label="Name" placeholder="Your name" />)}
          <FormField control={form.control} name="email" label="Email" placeholder="Your email address" type="email" />
          <FormField control={form.control} name="password" label="Password" placeholder="Your password" type="password"/>
          <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Sign up'}</Button>
        </form>
      </Form>
      <p className="text-center">
        {isSignIn ? 'No account yet?' : 'Have an account already?'}
        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
        {!isSignIn ? 'Sign in' : 'Sign up'}</Link>
      </p>
    </div>
    </div>
  )
}

export default AuthForm