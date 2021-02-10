import Head from 'next/head';

export default function DetailLayout(props) {
  return (
    <>
      <Head>
        <title>{props.detailJson.type + " | " + props.detailJson.date}</title>
      </Head>
      <div className="p-5">
        <div className="">    
          <p className="hidden">{props.detailJson.id}</p>
          <p className="text-base font-bold text-gray-600">
            {props.detailJson.date}
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
      <div className="">
      {
        props.detailJson.image ? 
        <img
          src={'/api/image?url='+encodeURIComponent(`http://sunrint.hs.kr${props.detailJson.image}`)}
          alt="Meal Picture"
        /> : <div className="w-full h-72 bg-gray-200 text-white flex flex-wrap content-center justify-center"><p className="text-lg font-bold">이미지가 등록되지 않았습니다.</p></div>
      }</div>
    </>
  )
}