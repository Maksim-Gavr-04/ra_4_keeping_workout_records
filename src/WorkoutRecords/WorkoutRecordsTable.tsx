import type { WorkoutRecord } from './WorkoutRecords';

interface WorkoutRecordsTableProps {
  records: WorkoutRecord[],
  onRecordEdit: (record: WorkoutRecord) => void,
  onRecordDelete: (record: WorkoutRecord) => void
}

function WorkoutRecordsTable({ records, onRecordEdit, onRecordDelete }: WorkoutRecordsTableProps) {
  return (
    <div className='workout-records__table-container'>
      <table className='workout-records__table workout-records-table'>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено (км)</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          { records.length
            ? records.map(r => (
              <tr className='workout-records-table__item' key={ r.id }>
                <td>{ r.date }</td>
                <td>{ r.distance }</td>
                <td className='workout-records-table__actions'>
                  <button className='workout-records-table__edit' onClick={ () => onRecordEdit(r) }>✎</button>
                  <button className='workout-records-table__delete' onClick={ () => onRecordDelete(r) }>✘</button>
                </td>
              </tr>
            ))
            : (
              <tr className='workout-records-table__empty-item'>
                <td colSpan={ 3 }>Нет данных о тренировках</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutRecordsTable;