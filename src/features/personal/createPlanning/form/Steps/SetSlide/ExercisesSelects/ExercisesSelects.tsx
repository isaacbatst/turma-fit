import CustomSelect from './CustomSelect';
import MovementsSelect from './MovementsSelect';
import EquipmentsSelect from './EquipmentsSelect';
import GripsSelect from './GripsSelect';
import { useGetEquipmentsQuery, useGetMovementsQuery } from '../../../../api';
import { Grip } from '@prisma/client';

const ExercisesSelects = () => {
  const { data: equipments } = useGetEquipmentsQuery()
  const { data: movements } = useGetMovementsQuery()

  return (
    <>
      <MovementsSelect movements={movements || []} />
      <EquipmentsSelect equipments={equipments || []} />
      <GripsSelect grips={Object.values(Grip)} />
    </>
  )
}

export default ExercisesSelects