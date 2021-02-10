import React from 'react';
import {useRouter} from 'next/router';

import DetailSkeleton from '../../components/DetailSkeleton';
import DetailLayout from '../../components/DetailLayout';

const vercel = process.env.VERCEL_URL;
const url = vercel ? 'https://' + vercel : 'http://localhost:3000';

export default function Detail(props) {
  const router = useRouter();
  console.log('detail render:\n', props , '\nFallback: ', router.isFallback, router);

  return (
    <div className="container mx-auto max-w-3xl">
     { router.isFallback ? <DetailSkeleton /> : <DetailLayout {...props} />}
    </div>
  )
}

export async function getStaticPaths() { return { paths: [], fallback: true } }

export async function getStaticProps(context) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  try {
    const detailJson = await fetcher(`${url}/api/mealDetail?id=${context.params.id}`);
    return detailJson.hasOwnProperty('id') ? 
    { props: { detailJson } } : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
