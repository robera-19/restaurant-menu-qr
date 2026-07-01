import React from 'react';

const FormInput = ({ label, error, type = 'text', ...props }) => (
  <div className="space-y-1.5 w-full">
    <label
      className="
        text-[10px] 
        font-black 
        text-slate-400 
        ml-2 
        uppercase
      "
    >
      {label}
    </label>
    <input
      type={type}
      className={`
        w-full 
        p-4 
        bg-slate-50 
        rounded-2xl 
        outline-none 
        border-2 
        transition-all
        ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-transparent focus:border-orange-500'
        }
      `}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-[10px] font-bold ml-2 uppercase">
        {error}
      </p>
    )}
  </div>
);

export default FormInput;
