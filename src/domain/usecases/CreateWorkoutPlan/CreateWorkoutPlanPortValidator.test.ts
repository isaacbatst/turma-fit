import { CreateWorkoutPlanDataMock } from "./CreateWorkoutPlanDataMock"
import { CreateWorkoutPlanPortValidator } from "./CreateWorkoutPlanPortValidator";

describe('CreateWorkoutPlanPortValidator', () => {
  describe('Given invalid Grip', () => {
    it('should throw INVALID_GRIP error', () => {
      const dataMock = new CreateWorkoutPlanDataMock();
      const validator = new CreateWorkoutPlanPortValidator();
      dataMock.PORT_EXERCISE.grip = 'invalid_grip'


      expect(() => {
        validator.validate(dataMock.PORT);
      }).toThrowError('INVALID_GRIP')
    })
  })

  describe('Given invalid Day', () => {
    it('should throw INVALID_DAY error', () => {
      const dataMock = new CreateWorkoutPlanDataMock();
      const validator = new CreateWorkoutPlanPortValidator();
      dataMock.PORT_WORKOUT.day = 'invalid_day'


      expect(() => {
        validator.validate(dataMock.PORT);
      }).toThrowError('INVALID_DAY')
    })
  })

  describe('Given valid port', () => {
    describe('with exercise with grip', () => { 
      it('should not throw', () => {
        const dataMock = new CreateWorkoutPlanDataMock();
        const validator = new CreateWorkoutPlanPortValidator();
  
        expect(() => {
          validator.validate(dataMock.PORT)
        }).not.toThrowError();
      })
    })

    describe('with exercise without grip', () => { 
      it('should not throw', () => {
        const dataMock = new CreateWorkoutPlanDataMock();
        const validator = new CreateWorkoutPlanPortValidator();
        dataMock.PORT_EXERCISE.grip = undefined;
  
        expect(() => {
          validator.validate(dataMock.PORT)
        }).not.toThrowError();
      })
    })
  })
})