import { Exercise, Set, PrismaClient, Training, TrainingPlanning } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Header from "../application/frontend/components/Header";
import Layout from "../application/frontend/components/Layout";
import { prisma } from "../lib/prisma";
import containers from '../styles/common/containers.module.scss';
import { NextPageWithAuth } from "../../types/page";
import { ExerciseWithDetails } from "../../types/schema";

type Props = {
  trainingPlannings: (TrainingPlanning & {
    trainings: (Training & {
        sets: (Set & {
            exercises: ExerciseWithDetails[];
        })[];
    })[];
  })[];
}

const Trainings: NextPage<Props> = ({ trainingPlannings }) => {
  return (
    <Layout>
      <Header title="Meus treinos" />
      <div className={containers.container}>
        { trainingPlannings.map(trainingPlanning => (
          trainingPlanning.trainings.map(training => (
            <div key={training.id}>
              <span>Treino {training.letter}</span>
              <div>
                { training.sets.map(serie => (
                  <div key={serie.id}>{serie.exercises.map(exercise => (
                    <span key={exercise.id}>{exercise.movement.name}</span>
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
            advices: {
              include: {
                trainingPlannings: {
                  include: {
                    trainings: {
                      include: {
                        sets: {
                          include: {
                            exercises: {
                              include: {
                                movement: {
                                  include: {
                                    focusedMuscleGroup: true
                                  }
                                },
                                equipment: true,
                              }
                            }
                          }
                        }
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
          trainingPlannings: user.student.advices.flatMap(advice => advice.trainingPlannings)
        }
      }  
    }
  }

  return {
    props: {}
  };
}

export default Trainings;