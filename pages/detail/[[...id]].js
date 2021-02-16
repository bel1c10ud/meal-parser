import React from 'react';
import Error from 'next/error';
import {useRouter} from 'next/router';

import DetailSkeleton from '../../components/DetailSkeleton';
import DetailLayout from '../../components/DetailLayout';

const vercel = process.env.VERCEL_URL;
const url = vercel ? 'https://' + vercel : 'http://localhost:3000';

export default function Detail(props) {
  const router = useRouter();
  console.log('detail render:\n', props , '\nFallback: ', router.isFallback, router);

  if(props.hasOwnProperty('errorCode')) {
    return <Error statusCode={props.errorCode} />
  }

  return (
    <div className="container mx-auto max-w-3xl">
     { router.isFallback ? <DetailSkeleton /> : <DetailLayout {...props} />}
    </div>
  )
}

export async function getStaticPaths() { return { paths: [], fallback: true } }

export async function getStaticProps(context) {let mid;

  if(context.params.hasOwnProperty('id') && context.params.id.length === 1) {
    mid = context.params.id;
  } else {
    return { props: { 'errorCode': 400 } }
  }

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  try {
    const detailJson = await fetcher(`${url}/api/mealDetail?id=${mid}`);
    return detailJson.hasOwnProperty('errorCode') ? 
    { props: { 'errorCode': detailJson.errorCode, 'errorMessage': 'Error code in API.' } } : 
    { props: { detailJson } };
  } catch (error) {
    console.error(error);
    return { props: { 'errorCode': 404, 'error': error } };
  }
}
