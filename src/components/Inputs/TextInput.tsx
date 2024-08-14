import React from 'react';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string
}

const TextInput: React.FC<InputProps> = ({ label, type, placeholder, value, onChange, icon }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">
        {label}
      </label>

      <div className='flex flex-row items-stretch '>
        {icon ?
          <div className='px-2 py-1 border border-gray-400 border-r-0 bg-gray-200 rounded-tl-sm rounded-bl-sm'>
            <span className='font-semibold text-sm text-gray-800'>{icon}</span>
          </div>
        : null}
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${icon ? 'rounded-tr-sm rounded-br-sm' : 'rounded-sm'} border w-full py-2 px-3 text-gray-700 leading-tight border-gray-400 focus:border-gray-500 outline-none`}
        />
      </div>
    </div>
  );
};

export default TextInput;