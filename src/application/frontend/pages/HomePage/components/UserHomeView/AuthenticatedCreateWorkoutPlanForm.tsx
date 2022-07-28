import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { HiPlus, HiX } from 'react-icons/hi'
import CreateWorkoutPlanForm from '../CreateWorkoutPlanForm/CreateWorkoutPlanForm'

const AuthenticatedCreateWorkoutPlanForm: React.FC = () => {
  const [isShowingForm, setIsShowingForm] = useState(false);
  const router = useRouter();
  const prevIsShowingForm = useRef<boolean>();

  useEffect(() => {
    if(isShowingForm && !prevIsShowingForm.current){
      router.push('#create')
    }

    prevIsShowingForm.current = isShowingForm;
  }, [isShowingForm, router])

  return (
    <>
      {
        isShowingForm && <div className="relative" id="create">
          <button className="absolute right-0 text-white z-50 p-2 cursor-pointer active:scale-125"
            onClick={() => setIsShowingForm(false)}
          >
            <HiX size={'26px'} />
          </button>
          <CreateWorkoutPlanForm isAuthenticated />
        </div> 
      } 
      {
        !isShowingForm && <button className='fixed rounded-full bottom-0 right-0 cursor-pointer 
          text-white shadow-md p-3 m-4 z-50 bg-red-600 hover:scale-105 active:scale-110'
        onClick={() => setIsShowingForm(true)}
        >
          <HiPlus size={50}/>
        </button>
      }
    </>
  )
}

export default AuthenticatedCreateWorkoutPlanForm