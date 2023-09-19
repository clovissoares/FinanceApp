import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"

import { getCurrentWeek } from './utils/getCurrentWeek';
import { getDespesas } from './utils/apiFetch';
import { DespesasType } from './types/despesasType';
import ContentTable from './components/ContentTables';
import Modal from './components/Modal';

function App() {
  const [date, setDate] = useState<DateRange | undefined>(getCurrentWeek());
  const [data, setData] = useState<DespesasType | undefined>();
  const [toggle, setToggle] = useState(false);

  const onDateRangeChange = ( newDateRange: DateRange) => {
    setDate(newDateRange);
  };

  const onToggle = () => {
    setToggle(toggle => !toggle);
  }

  useEffect(()=> {
    const controller = new AbortController();
    const signal = controller.signal;

    if(date?.from !== undefined && date.to !== undefined)
    getDespesas(date, signal)
    .then((newData) => setData(newData))
    .catch((err)=> console.log(`Aborting fetch! ${err}`))

    return () => {controller.abort()};
  }, [date, toggle]);

  if(!data) return <></>

  return (
    <>
    <div className='flex items-center justify-center mt-7 mb-10'>
      <DatePickerWithRange className={"mr-5"}  dateRange={date} onDateRangeChange={onDateRangeChange}/>
      <Modal onToggle={onToggle}></Modal>
    </div>
    <ContentTable onToggle={onToggle} content={data}></ContentTable>
    </>
  )
}

export default App
