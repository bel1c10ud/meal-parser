import Head from 'next/head';
import DateControllerSkeleton from './DateControllerSkeleton';

export default function CalendarSkeleton() {
  let calendarArray = [];
  for(let i=0; i<35; i++) {
    calendarArray.push(i);
  }
  return (
    <>
      <Head>
        <title>캘린더 |</title>
      </Head>
      <DateControllerSkeleton />
      <div className="grid md:grid-cols-7">
      {
        calendarArray.map((c, i) => (
          <div key={`daySkeleton-${i}`} className="h-14 p-3 border-b">
            <p key={`dayNumSkeleton-${i}`} className="animate-pulse h-6 w-7 bg-gray-100"></p>
          </div>
          )
        )
      }
      </div>
    </>
  )
}