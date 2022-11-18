import {useRouter} from 'next/router';
import Error from 'next/error';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

import CalendarSkeleton from '../../components/CalendarSkeleton';
import CalendarLayout from '../../components/CalendarLayout';

const vercel = process.env.VERCEL_URL;
const url = vercel ? 'https://' + vercel : 'http://localhost:3000';

const currentPath = "calendar";

function Calendar(props) { 
  const router = useRouter();

  if(props.hasOwnProperty('errorCode')) {
    return <Error statusCode={props.errorCode} />
  }

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

export async function getStaticProps(context) {
  let isRedirect = false;
  const badRequest = { props: { 'errorCode': 400 } };

  let dateParams = [];

  if(context.params.hasOwnProperty('date')) {
    const notNumberRegex = new RegExp(/[^0-9]/, 'ig');
    for(const value of context.params.date) {
      if(notNumberRegex.test(value) === true) {
        return badRequest;
      } else {
        dateParams.push(value);
      }
    }
  }

  let year, month;
  const dayjsDate = dayjs().tz('Asia/Seoul');

  if(dateParams.length === 2) { // 2 query
    // set year
    if(dateParams[0].length === 4) {
      year = dateParams[0];
    } else if (dateParams[0].length === 2) {
      year = `20${dateParams[0]}`;
      isRedirect = true;
    } else {
      return badRequest
    }
    // set month
    if(Number(dateParams[1]) >= 1 && Number(dateParams[1]) <= 12 ) {
      month = dateParams[1];
    } else {
      return badRequest
    }
  } else if(dateParams.length === 1) { // 1 query
    if(Number(dateParams[0]) >= 1 && Number(dateParams[0]) <= 12 ) {
      year = dayjsDate.year();
      month = dateParams[0];
      isRedirect = true;
    } else {
      return badRequest
    }
  } else if(dateParams.length === 0) { // no query
    year = dayjsDate.year();
    month = dayjsDate.month() + 1;
    // isRedirect = true; // 쿼리 없이 접근시, redirect 없이 현재 Date를 기준으로 표시
  } else { // other case (3~)
    return badRequest
  }
  
  if(isRedirect === true) {
    return {
      redirect: {
        destination: `/${currentPath}/${year}/${month}`,
        permanent: true
      } 
    }
  }
  
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  try {
    let calendarJson = await fetcher(`${url}/api/mealCalendar?year=${year}&month=${month}`);

    return calendarJson.hasOwnProperty('errorCode') ?
      { props: { 'errorCode': calendarJson.errorCode, 'errorMessage': 'Error code in API'} } : 
      { props: { 'dateParams': [year,month], calendarJson } }; 
  } catch(error) {
    return { props: { 'errorCode': 404, 'error': error } };
  }
}

export default Calendar;