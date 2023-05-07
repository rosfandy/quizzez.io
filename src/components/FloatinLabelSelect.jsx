import { useState } from 'react';
import PropTypes from 'prop-types';


export default function SelectInput(props) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    const selectedKey = e.target.options[e.target.selectedIndex].getAttribute('data-key');
    const selectedValue = e.target.value;
    setValue(selectedValue);
    props.setSelected({
      [props.label]: selectedKey
    });
  }

  return (
    <div className="input-container">
      <label className={value && 'filled'} htmlFor="lang">{props.label}</label>
      <select className='pb-3 pt-[2.5vh] border-2 border-solid pl-[1.5vh] pr-64 text-[12px] rounded-md  focus:outline-[#2B78E4]' onChange={handleChange} name="languages" id="lang">
        <option value="" disabled selected></option>
        {props.category.map((item) => (
          <option key={item.id} value={item.name} data-key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}



