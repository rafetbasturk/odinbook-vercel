/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdEmail, MdRemoveRedEye, MdCloudUpload } from "react-icons/md"

const InputElement = ({ type, name, value, handleChange, labelText }) => {
  const [elementType, setElementType] = useState(type)
  const handleClick = () => {
    elementType === "password"
      ? setElementType("text")
      : setElementType("password")
  }
  return (
    <div className='input-container'>
      <label htmlFor={name} className='label'>
        {type === "file" ? <span className="label-span"><MdCloudUpload /> Select Image</span> : labelText || name}
        <input
          type={elementType}
          value={value}
          name={name}
          id={name}
          onChange={handleChange}
          className='input'
        />
        {type === "email" ? <MdEmail className="input-icon" /> : null}
        {type === "password" ? <MdRemoveRedEye className="input-icon eye" onClick={handleClick} /> : null}
      </label>
    </div>
  );
};

export default InputElement;