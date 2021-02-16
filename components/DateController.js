import Select from 'react-select';

export default function DateController(props) {
  const yearObject = props.yearRange.map( c => ({ 'value': c, 'label': c }) );
  const monthObject = props.monthRange.map( c =>({ 'value': c, 'label': c }) );

  return (
    <div className={props.className}>
      <div className="inline-block align-middle mr-4">
        <Select
        id="year-selector"
        instanceId="year-selector"
        inputId="year-selector"
        className="w-28 h-10 inline-block mr-2"
        options={yearObject}
        value={{'value':props.selectedYear, 'label': props.selectedYear}}
        onChange={(e) => props.setSelectedYear(Number(e.value))}
        isSearchable={false}
        />
        <Select 
        id="month-selector"
        instanceId="month-selector"
        inputId="month-selector"
        className="w-20 h-10 inline-block"
        options={monthObject}
        value={{'value':props.selectedMonth, 'label': props.selectedMonth}}
        onChange={(e) => props.setSelectedMonth(Number(e.value))}
        isSearchable={false}
        />
      </div>
      <div className="inline-block align-middle">
        <button 
        className="w-10 h-10 border border-gray-300 text-gray-400 rounded-full hover:border-gray-400 mr-2"
        onClick={() => props.prevNextDate(-1)}
        >
          &#xE000;
        </button>
        <button 
        className="w-10 h-10 border border-gray-300 text-gray-400 rounded-full hover:border-gray-400"
        onClick={() => props.prevNextDate(1)}
        >
          &#xE001;
        </button>
      </div>
    </div>
  )
}