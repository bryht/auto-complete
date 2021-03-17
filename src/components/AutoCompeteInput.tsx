import React, { Component } from 'react';
import './AutoCompleteInput.scss';

export interface IProps {
    id: string;
    options: Array<string>;
    placeholder: string;
    inputClassName: string;
    listClassName: string;
    onKeyDown: (key: string) => void;
    onChange: (value: string) => void;
    value: string;

}

class AutoCompeteInput extends Component<IProps, { isShowDropdown: boolean, inputValue: string }> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            isShowDropdown: false,
            inputValue: ''
        }
    }


    onValueChanged(value: string) {
        const { onChange } = this.props;

        this.setState({ isShowDropdown: !!value, inputValue: value })

        onChange(value);
    }

    render() {
        const {
            id,
            options,
            placeholder,
            inputClassName,
            listClassName,
            onKeyDown,
        } = this.props;
        const {
            isShowDropdown,
            inputValue,
        } = this.state;
        return (
            <>
                <input type="text" id={id || 'auto-complete-input'}
                    className={`auto-complete-input-class-name ${inputClassName}`}
                    placeholder={placeholder || ''}
                    onKeyDown={e => onKeyDown(e.key)}
                    onChange={e => this.onValueChanged(e.currentTarget.value)}
                >
                </input>
                <ul className={`auto-complete-list-class-name ${listClassName} ${isShowDropdown && 'show'}`}>
                    {options.filter(p => p.indexOf(inputValue) > -1).map(option => (<li>{option}</li>))}
                </ul>
            </>
        );
    }
}

export default AutoCompeteInput;