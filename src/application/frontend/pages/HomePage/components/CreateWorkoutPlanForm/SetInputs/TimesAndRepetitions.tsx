import React from 'react'

const TimesAndRepetitions: React.FC = () => {
  return (
    <div>
      <label htmlFor="set-times">
            Séries
        <input type="number" name="set-times" id="set-times" />
      </label>
      <label htmlFor="set-repetitions">
            Repetições
        <input type="number" name="set-repetitions" id="set-repetitions" />
      </label>
    </div>
  )
}

export default TimesAndRepetitions