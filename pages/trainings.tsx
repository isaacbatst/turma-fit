import { Exercise, ExerciseSerie, PrismaClient, Training, TrainingPlanning } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { prisma } from "../lib/prisma";
import containers from '../styles/common/containers.module.scss';

type Props = {
  trainingPlannings: (TrainingPlanning & {
    trainings: (Training & {
        exercisesSeries: (ExerciseSerie & {
            exercises: Exercise[];
        })[];
    })[];
  })[];
}

const Trainings: NextPage<Props> = ({ trainingPlannings }) => {
  console.log(trainingPlannings)
  return (
    <Layout>
      <Header title="Meus treinos" />
      <div className={containers.container}>
        { trainingPlannings.map(trainingPlanning => (
          trainingPlanning.trainings.map(training => (
            <div key={training.id}>
              <span>Treino {training.letter}</span>
              <div>
                { training.exercisesSeries.map(serie => (
                  <div key={serie.id}>{serie.exercises.map(exercise => (
                    <span key={exercise.id}>{exercise.name}</span>
                  ))}</div>
                )) }
              </div>
            </div>
          ))
        )) }
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(session) {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email || ''
      },
      include: {
        student: {
          include: {
            trainingPlannings: {
              include: {
                trainings: {
                  include: {
                    exercisesSeries: {
                      include: {
                        exercises: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  
    if(user?.student){
      return {
        props: {
          trainingPlannings: user.student.trainingPlannings
        }
      }  
    }
  }

  return {
    props: {}
  };
}

export default Trainings;