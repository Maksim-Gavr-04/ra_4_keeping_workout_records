import { ru } from 'date-fns/locale/ru';
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import parseDate from './parseDate';

interface WorkoutRecordsFormProps {
  formData: { date: string, distance: number },
  setFormData: (formData: { date: string, distance: number }) => void,
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function WorkoutRecordsForm({ formData, setFormData, onFormSubmit }: WorkoutRecordsFormProps) {
  return (
    <form className='workout-records__form workout-records-form' onSubmit={onFormSubmit}>
      <div className='workout-records-form__date-box'>
        <label className='workout-records-form__label' htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
        <DatePicker
          className='workout-records-form__date'
          id='date'
          dateFormat='dd.MM.yyyy'
          placeholderText='Выберите дату...'
          locale={ru}
          selected={formData.date ? parseDate(formData.date) : null}
          maxDate={new Date()}
          onChange={(date: Date | null) => {
            if (date) setFormData({ ...formData, date: date.toLocaleDateString() });
          }}
          showIcon
          required
        />
      </div>
      <div className='workout-records-form__distance-box'>
        <label className='workout-records-form__label' htmlFor='distance'>Пройдено (км)</label>
        <input
          className='workout-records-form__distance'
          id='distance'
          type='number'
          value={formData.distance}
          onChange={e => setFormData({ ...formData, distance: Number(e.target.value) })}
          step={0.1}
          min={0.1}
          max={200}
          required
        />
      </div>
      <button className='workout-records-form__submit'>ОК</button>
    </form>
  );
}

export default WorkoutRecordsForm;