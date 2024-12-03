import React from 'react';
import classNames from 'classnames';

import { Flexbox } from './Layout';

const range = (lo: number, hi: number): number[] => Array.from(Array(hi - lo).keys()).map((n) => n + lo);
export const rangeOptions = (lo: number, hi: number): { value: string; label: string }[] =>
  range(lo, hi).map((n) => ({ value: n.toString(), label: n.toString() }));

interface SelectProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  value?: string;
  setValue?: (value: string) => void;
  className?: string;
  label?: string;
  link?: {
    href: string;
    text: string;
  };
  id?: string;
}

const Select: React.FC<SelectProps> = ({ options, defaultValue, value, setValue, label, link, id, className = '' }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (setValue) {
      setValue(event.target.value);
    }
  };

  const classes = classNames(
    'block w-full px-3 py-2 border border-border bg-bg rounded-md shadow-sm sm:text-sm placeholder-text-secondary',
    'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-focus-ring transition duration-200 ease-in-out',
    className,
  );

  return (
    <div className="block w-full">
      <Flexbox justify="between" direction="row">
        {label && (
          <label className="block text-sm font-medium text-text" htmlFor={id}>
            {label}
          </label>
        )}
        {link && (
          <a href={link.href} className="text-sm font-medium text-link hover:text-link-active">
            {link.text}
          </a>
        )}
      </Flexbox>
      <select className={classes} defaultValue={defaultValue} onChange={handleChange} id={id} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;