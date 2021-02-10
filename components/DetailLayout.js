import Head from 'next/head';
import Image from 'next/image';

export default function DetailLayout(props) {
  const detailDate = new Date(props.detailJson.date);
  const dayArray = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <>
      <Head>
        <title>{props.detailJson.type + " | " + props.detailJson.date}</title>
      </Head>
      <div className="p-5">
        <div className="">    
          <p className="hidden">{props.detailJson.id}</p>
          <p className="text-base font-bold text-gray-600">
            {
              detailDate.getFullYear() + "년 "
              + (detailDate.getMonth()+1).toString() + "월 " 
              + detailDate.getDate() + "일 "
              + dayArray[detailDate.getDay()]+"요일"
            }
          </p>
          <p>
            <span className="text-3xl font-bold text-gray-900">
              {props.detailJson.type}
            </span>
            <span className="text-3xl font-bold text-gray-300 mx-1.5">|</span>
            <span className="text-3xl font-bold text-gray-300 truncate">
              {props.detailJson.title} 
            </span>
          </p>
          <p className="text-xl font-bold text-gray-400">
            {props.detailJson.calorie}
          </p>
        </div>
        <ul className="mt-3">
        {
          props.detailJson.menu.map((c, i) => {
            return (
              <li key={`menu-item-${props.detailJson.id}-${i}`} 
              className="text-base font-medium text-gray-900 leading-relaxed">
                <span className='select-none mr-1'>·</span>{c}
              </li>
            )
          })
        }
        </ul>
      </div>
      <div className="w-full h-auto">
      {
        Object.keys(props.detailJson.image).length > 0 ? 
        <Image
          src={'/api/image?url='+encodeURIComponent(props.detailJson.image['url'])}
          unoptimized
          // src={props.detailJson.image['url']}
          alt="Meal Picture"
          layout="responsive"
          width={props.detailJson.image['width']}
          height={props.detailJson.image['height']}
        /> : <div className="w-full h-72 bg-gray-200 text-white flex flex-wrap content-center justify-center"><p className="text-lg font-bold">이미지가 등록되지 않았습니다.</p></div>
      }</div>
    </>
  )
}