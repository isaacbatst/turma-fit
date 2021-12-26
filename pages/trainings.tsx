import { Exercise, ExerciseSerie, PrismaClient, Training, TrainingPlanning } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Header from "../components/Header";
import Layout from "../components/Layout";
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
    const prisma = new PrismaClient();

    const student = await prisma.student.findFirst({
      where: {
        email: session.user?.email || ''
      },
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
    })
  
    if(student){
      return {
        props: {
          trainingPlannings: student.trainingPlannings
        }
      }  
    }
  }

  return {
    props: {}
  };
}

export default Trainings;