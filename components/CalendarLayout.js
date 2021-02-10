import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import DateController from './DateController';

const currentPath = "calendar";

function CalendarLayout(props) {
  const router = useRouter();

  const dayArray = ['일', '월', '화', '수', '목', '금', '토'];

  const [selectedYear, setSelectedYear] = useState(Number(props.dateParams[0]));
  const [selectedMonth, setSelectedMonth] = useState(Number(props.dateParams[1]));

  const changeYear = (e) => setSelectedYear(e);
  const changeMonth = (e) => setSelectedMonth(e);

  const yearRange = [2017, 2018, 2019, 2020, 2021, 2022];
  const monthRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    if(Number(props.dateParams[0]) !== selectedYear || Number(props.dateParams[1]) !== selectedMonth) {
      router.push(`/${currentPath}/${selectedYear}/${selectedMonth}`)
    }
  },[selectedYear, selectedMonth])

  const onChangeDate = (e) => {
    if(e.currentTarget.name === 'year') {
      setSelectedYear(Number(e.currentTarget.value));
    } else if(e.currentTarget.name === 'month') {
      setSelectedMonth(Number(e.currentTarget.value));
    }
  }

  const prevNextDate = (type) => {
    if(selectedMonth+type >= 1 && selectedMonth+type <= 12) {
      setSelectedMonth(selectedMonth + type);
    } else if(selectedYear+type >= yearRange[0] && selectedYear+type <= yearRange[yearRange.length - 1]) {
      setSelectedYear(selectedYear + type);
      setSelectedMonth(type === 1 ? 1 : 12);
    } else {
      alert('no more date');
    }
  }

  return (
    <>
      <Head>
        <title>{`캘린더 | ${props.dateParams[1]}월, ${props.dateParams[0]}`}</title>
      </Head>
      <DateController
      className="mb-4 align-middle"
      yearRange={yearRange}
      monthRange={monthRange}
      selectedYear={selectedYear} 
      selectedMonth={selectedMonth} 
      setSelectedYear={changeYear} 
      setSelectedMonth={changeMonth}
      prevNextDate={prevNextDate}
      onChangeDate={onChangeDate}
      />
      <div className="grid md:grid-cols-7">
{
  props.calendarJson.map(c => {
    const [yaer, month, date, day] = c.date.split('-');
    return (
      <div key={c.id} 
      className={`py-3 md:px-3 h-full border-b ${date != "" ? "" : "hidden md:block"}`}
      >
        <p className={
          `text-2xl font-medium pr-4 md:mb-2  align-top inline-block md:block group-hover:text-white text-gray-900 ${day === "0" ? "text-red-600" : ""} ${day === "6" ? "text-blue-600" : ""}`
        }>
          {date}
          <span className={`text-xs ml-1 align-middle md:hidden ${date != "" ? "" : "hidden"}`}>
            ({dayArray[Number(day)]})
          </span>
        </p>
        <div className="inline-block md:block h-auto pl-4 md:pl-0 border-l md:border-l-0 align-middle">
        {c.mealArray.map(c => {
          return (
          <Link href={`/detail/[id]`} as={`/detail/${c.id}`}>
            <a key={c.id} 
            title={c.title} 
            className="text-base block truncate my-2" 
            >
              <span className='select-none mr-1'>·</span>
              <span className='hover:underline'>{c.title}</span>
            </a>
          </Link>)
        })}
        </div>
      </div>
    )
  })
}
      </div>
    </>
  )
}

export default CalendarLayout;