import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'

const userState = atom<User>({
  key: 'user',
  default: null,
})

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    const auth = getAuth()

    signInAnonymously(auth).catch(function (error) {
      // Handle Errors here.
      console.error(error)
    })

    onAuthStateChanged(auth, function (firebaseUser) {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
        })
      } else {
        // User is signed out.
        setUser(null)
      }
    })
  }, [])

  return { user }
}
