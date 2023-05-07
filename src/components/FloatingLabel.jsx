import { useState } from 'react';
import PropTypes from 'prop-types';
import '../index.css';

export default function TextInput(props) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
    props.setInput({
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="input-container">
      <input type={props.type} className='pb-3 pt-[2vh] border-2 border-solid pl-[2vh] px-16 text-[12px] rounded-md  focus:outline-[#2B78E4]' value={value} onChange={handleChange} name={props.name} />
      <label className={value && 'filled'} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
};
