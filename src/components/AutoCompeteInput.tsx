import React, { Component, RefObject } from 'react';
import './AutoCompleteInput.scss';

export interface IProps {
    id: string;
    options: Array<string>;
    placeholder: string;
    className: string;
    inputClassName: string;
    listClassName: string;
    onKeyDown: (key: string) => void;
    onChange: (value: string) => void;
    value: string;

}

class AutoCompeteInput extends Component<IProps, { isShowDropdown: boolean, inputValue: string, selectedOption: string }> {

    inputRef: RefObject<HTMLInputElement>;
    constructor(props: Readonly<IProps>) {
        super(props);
        this.inputRef = React.createRef<HTMLInputElement>();
        this.state = {
            isShowDropdown: false,
            inputValue: '',
            selectedOption: '',
        }
    }

    filterOptions(value: string) {
        const { options } = this.props;
        return options.filter(p => p.indexOf(value) > -1).sort((a, b) => a.length - b.length);
    }
    onValueChanged(value: string) {
        const { onChange } = this.props;

        this.setState({
            isShowDropdown: !!value,
            inputValue: value,
            selectedOption: this.filterOptions(value)[0]
        })

        onChange(value);
    }

    onKeyDown(key: string) {
        const { onKeyDown, onChange } = this.props;
        const { selectedOption, inputValue } = this.state;
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
                onChange(selectedOption);
                this.setState({ isShowDropdown: false, inputValue: selectedOption }, () => onKeyDown(key));
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
        } = this.props;
        const {
            isShowDropdown,
            inputValue,
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

export default AutoCompeteInput;