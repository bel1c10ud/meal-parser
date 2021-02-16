import Select from 'react-select';

export default function DateControllerSkeleton() {
  return (
    <div className="mb-4">
      <div className="inline-block mr-4">
        <Select 
        id="year-selector"
        instanceId="year-selector"
        inputId="year-selector"
        className="w-28 h-10 inline-block mr-2" 
        isLoading={true} 
        placeholder={null}
        />
        <Select 
        id="month-selector"
        instanceId="month-selector"
        inputId="month-selector"
        className="w-24 h-10 inline-block" 
        isLoading={true} 
        placeholder=""
        />
      </div>
      <div className="inline-block">
        <button className="w-10 h-10 align-middle bg-gray-100 rounded-full animate-pulse mr-2"></button>
        <button className="w-10 h-10 align-middle bg-gray-100 rounded-full animate-pulse"></button>
      </div>
    </div>
  )
}