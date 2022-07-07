import Header from '@application/frontend/components/common/Header';
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const WorkoutPreviewPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div>
        {JSON.stringify(router.query)}
      </div>
    </>
  )
}

export default WorkoutPreviewPage