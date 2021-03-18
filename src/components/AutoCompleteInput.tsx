import React, { Component, RefObject } from 'react';
import './AutoCompleteInput.scss';

export interface IProps {
    id: string;
    options: Array<string>;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    listClassName?: string;
    onKeyDown: (key: string) => void;
    onChange: (value: string) => void;
    inputValue: string;
}

class AutoCompleteInput extends Component<IProps, { isShowDropdown: boolean, selectedOption: string }> {

    inputRef: RefObject<HTMLInputElement>;
    constructor(props: Readonly<IProps>) {
        super(props);
        this.inputRef = React.createRef<HTMLInputElement>();
        this.state = {
            isShowDropdown: false,
            selectedOption: '',
        }
    }

    filterOptions(value: string) {
        const { options } = this.props;
        return options.filter(p => p.indexOf(value) > -1).sort((a, b) => a.length - b.length);
    }
    onValueChanged(value: string) {
        const { onChange } = this.props;
        onChange(value);
        this.setState({
            isShowDropdown: !!value,
            selectedOption: this.filterOptions(value)[0]
        });
    }

    onKeyDown(key: string) {
        const { onKeyDown, inputValue } = this.props;
        const { selectedOption } = this.state;
        const options = this.filterOptions(inputValue);
        if (key === "ArrowUp") {
            let index = options.findIndex(p => p === selectedOption);
            if (index === 0) {
                this.setState({ selectedOption: options[options.length - 1] });
            }
            else if (index > 0) {
                this.setState({ selectedOption: options[index - 1] });
            }
        }

        if (key === "ArrowDown") {
            let index = options.findIndex(p => p === selectedOption);
            if (index === options.length - 1) {
                this.setState({ selectedOption: options[0] });
            }
            else if (index > -1) {
                this.setState({ selectedOption: options[index + 1] });
            }
        }
        if (key === "Tab" || key === "Enter") {
            if (selectedOption) {
                this.onValueChanged(selectedOption);
                this.setState({ isShowDropdown: false }, () => onKeyDown(key));
            }
        } else {
            onKeyDown(key);
        }

    }

    render() {
        const {
            id,
            placeholder,
            className,
            inputClassName,
            listClassName,
            inputValue,
        } = this.props;
        const {
            isShowDropdown,
            selectedOption,
        } = this.state;
        return (
            <div className={className || 'auto-complete'}>
                <input type="text" id={id || 'auto-complete-input'}
                    ref={this.inputRef}
                    onBlur={() => this.setState({ isShowDropdown: false })}
                    className={`auto-complete-input-class-name ${inputClassName}`}
                    placeholder={placeholder || ''}
                    onKeyDown={e => { this.onKeyDown(e.key); if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault() }}
                    onChange={e => this.onValueChanged(e.currentTarget.value)}
                    value={inputValue}
                >
                </input>
                <ul className={`auto-complete-list-class-name ${listClassName} ${isShowDropdown && 'show'}`}>
                    {this.filterOptions(inputValue).map(option => <li className={option === selectedOption ? 'selected' : ''}>{option}</li>)}
                </ul>
            </div>
        );
    }
}

export default AutoCompleteInput;