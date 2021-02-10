import {useRouter} from 'next/router';

import CalendarSkeleton from '../../components/CalendarSkeleton';
import CalendarLayout from '../../components/CalendarLayout';

const currentPath = "calendar";

function Calendar(props) { 
  const router = useRouter(); 
  console.log('Cal render:\n', props , '\nFallback: ', router.isFallback, router);

  return (
    <div className="container mx-auto max-w-6xl p-5">
    {
      router.isFallback ? 
      <CalendarSkeleton /> : <CalendarLayout {...props}/>
    }
    </div>
  )
}

export async function getStaticPaths() { return { paths: [], fallback: true } }

export async function getStaticProps(context) { console.log("context: ", context)
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const now = new Date();
  let year, month;

  let isRedirect = false;
  const notFoundObject = {notFound: true};

  const dateParams = context.params.hasOwnProperty('date') ? 
    context.params.date : [];

  if(dateParams.length === 2) { // 2 query
    // set year
    if(dateParams[0].length === 4) {
      year = dateParams[0];
    } else if (dateParams[0].length === 2) {
      year = `20${dateParams[0]}`;
      isRedirect = true;
    } else {
      return notFoundObject
    }
    // set month
    if(Number(dateParams[1]) >= 1 && Number(dateParams[1]) <= 12 ) {
      month = dateParams[1];
    } else {
      return notFoundObject
    }
  } else if(dateParams.length === 1) { // 1 query
    if(Number(dateParams[0]) >= 1 && Number(dateParams[0]) <= 12 ) {
      year = now.getFullYear();
      month = dateParams[0];
      isRedirect = true;
    } else {
      return notFoundObject
    }
  } else if(dateParams.length === 0) { // no query
    year = now.getFullYear();
    month = now.getMonth() + 1;
    // isRedirect = true; // 쿼리 없이 접근시, redirect 없이 현재 Date를 기준으로 표시
  } else { // other case (3~)
    return notFoundObject
  }
  
  if(isRedirect === true) {
    return {
      redirect: {
        destination: `/${currentPath}/${year}/${month}`,
        permanent: true
      } 
    }
  }

  try {
    let calendarJson = await fetcher(`http://localhost:3000/api/mealCalendar?year=${year}&month=${month}`);
    return calendarJson.hasOwnProperty(0) ? // 배열이 비어있다면(== 비정상적인 응답)
      { props: { calendarJson, 'dateParams': [year,month] } } : notFoundObject; 
  } catch(error) {
    console.log(error)
    return notFoundObject;
  }
}

export default Calendar;