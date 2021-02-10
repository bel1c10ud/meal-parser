export default function DetailSkeleton() {
  return (
    <>
      <div className="p-5">
        <div className="animate-pulse">
          <div className="h-4 w-40 my-1 bg-gray-200"></div>
          <div className="bg-gray-200" style={{
            'height': '1.875rem', 'width': '8rem', 'margin': '0.2rem 0'
          }}></div>
          <div className="h-5 w-20 my-1 bg-gray-100"></div>
        </div>
        <div className="animate-pulse mt-3">
          <div>
            <span className='mr-1 align-top select-none'>·</span>
            <div className="inline-block h-4 w-20 my-1 bg-gray-200"></div>
          </div>
          <div>
            <span className='mr-1 align-top select-none'>·</span>
            <div className="inline-block h-4 w-20 my-1 bg-gray-200"></div>
          </div>
          <div>
            <span className='mr-1 align-top select-none'>·</span>
            <div className="inline-block h-4 w-20 my-1 bg-gray-200"></div>
          </div>
          <div>
            <span className='mr-1 align-top select-none'>·</span>
            <div className="inline-block h-4 w-20 my-1 bg-gray-200"></div>
          </div>
          <div>
            <span className='mr-1 align-top select-none'>·</span>
            <div className="inline-block h-4 w-20 my-1 bg-gray-200"></div>
          </div>
          <div>
            <span className='mr-1 align-top select-none'>·</span>
            <div className="inline-block h-4 w-20 my-1 bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-72 bg-gray-100"></div>
    </>
  )
}