import React from 'react';

type Props = {
    title: string;
    type: string;
    name: string;
    value: string | number;
    handleChange: (evt: any) => void;
    placeholder?: string;
    errorDiv?: string;
    errorMsg?: string;
    className?: string;
};

const Input: React.FC<Props> = props => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <input
                type={props.type}
                className={`form-control ${props.className}`}
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    );
};

export default Input;
