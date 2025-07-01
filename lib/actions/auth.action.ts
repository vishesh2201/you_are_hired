'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function signUp(params: SignUpParams){
    const {uid, name, email} = params;
    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists. Please Sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account created successfully. Please sign in.'
        }

    }
    catch(e: unknown){
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error(e);
        }
        // Optionally, you can check for Firebase error codes if needed
        return{
            success: false,
            message: 'Failed to create account'
        }
    }
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;
    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return{
                success: false,
                message: 'User does not exist'
            }
        }

        await setSessionCookie(idToken);
    }catch(e){
        console.log(e);
    }

}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60*60*24*7*1000,

    })

    cookieStore.set('session', sessionCookie, {
        maxAge:  60*60*24*7*1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}


export async function getCurrentUser(): Promise<User | null>{
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) return null;

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get()

        if(!userRecord.exists) return null;


        return{
            ...userRecord.data(),
            id: userRecord.id,
        } as User;


    }catch(e){
        console.log(e);
        return null;
    }
}


export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    
    if (!user) {
        redirect('/sign-in');
    }
    
    return user;
}

