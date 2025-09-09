import { useState } from 'react';
import { nanoid } from 'nanoid';
import parseDate from './parseDate';
import WorkoutRecordsForm from './WorkoutRecordsForm';
import WorkoutRecordsTable from './WorkoutRecordsTable';

export interface WorkoutRecord {
  readonly id: string,
  date: string,
  distance: number
}

function WorkoutRecords() {
  const initialFormData = { date: '', distance: 0 };
  const [ records, setRecords ] = useState<WorkoutRecord[]>([]);
  const [ dateOfEditableRecord, setDateOfEditableRecord ] = useState<string | null>(null);
  const [ formData, setFormData ] = useState(initialFormData);

  const addNewRecord = (date: string, distance: number) => {
    const newRecord = { id: nanoid(), date, distance };
    const insertionIndex = records.findIndex(r => parseDate(r.date).getTime() <= parseDate(date).getTime());
    if (insertionIndex !== -1) {
      setRecords([ ...records.slice(0, insertionIndex), newRecord, ...records.slice(insertionIndex) ]);
    } else {
      setRecords(records.length ? [ ...records, newRecord ] : [ newRecord ]);
    }
  };

  const editRecord = (date: string, distance: number, thereIsRecordWithSelectedDate: boolean) => {
    if (!thereIsRecordWithSelectedDate) /* Если выбрана новая дата */ {
      setRecords(records.map(r => r.date === dateOfEditableRecord ? { ...r, date, distance } : r));
    } else {
      if (date === dateOfEditableRecord) /* Если выбрана дата редактируемой записи */ {
        setRecords(records.map(r => r.date === date ? { ...r, distance } : r));
      } else /* Если выбрана дата другой записи */ {
        setRecords(records
          .filter(r => r.date !== dateOfEditableRecord)
          .map(r => r.date === date ? { ...r, distance } : r)
        );
      }
    }
    setDateOfEditableRecord(null);
  };

  const editRecordWithSelectedDate = () => setRecords(
    records.map(r => r.date === formData.date ? { ...r, distance: r.distance + formData.distance } : r)
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const thereIsRecordWithSelectedDate = records.some(r => r.date === formData.date);

    if (dateOfEditableRecord) /* Если редактируется запись */ {
      editRecord(formData.date, formData.distance, thereIsRecordWithSelectedDate);
    } else /* Если добавляется запись */ {
      if (thereIsRecordWithSelectedDate) /* Если выбрана дата редактируемой записи или другой */ {
        editRecordWithSelectedDate();
      } else /* Если выбрана новая дата */ {
        addNewRecord(formData.date, formData.distance);
      }
    }
    setFormData(initialFormData);
  };

  const onRecordEdit = (record: WorkoutRecord) => {
    setDateOfEditableRecord(record.date);
    setFormData({ date: record.date, distance: record.distance });
  };

  const onRecordDelete = (record: WorkoutRecord) => setRecords(records.filter(r => r.date !== record.date));

  return (
    <div className='workout-records'>
      <WorkoutRecordsForm formData={formData} setFormData={setFormData} onFormSubmit={onFormSubmit} />
      <WorkoutRecordsTable records={records} onRecordEdit={onRecordEdit} onRecordDelete={onRecordDelete} />
    </div>
  );
}

export default WorkoutRecords;