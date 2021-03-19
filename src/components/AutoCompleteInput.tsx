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

class AutoCompleteInput extends Component<IProps, { isShowDropdown: boolean, searchValue: string, selectedOption: string }> {

    inputRef: RefObject<HTMLInputElement>;
    constructor(props: Readonly<IProps>) {
        super(props);
        this.inputRef = React.createRef<HTMLInputElement>();
        this.state = {
            isShowDropdown: false,
            selectedOption: '',
            searchValue: this.props.inputValue
        }
    }

    filterOptions(value: string) {
        const { options } = this.props;
        return options.filter(p => p.indexOf(value) > -1).sort((a, b) => a.length - b.length);
    }
    onValueChanged(value: string) {
        const { onChange ,options } = this.props;
        onChange(value);
        this.setState({
            isShowDropdown: !!value,
            selectedOption: options.includes(value) ? value : '',
            searchValue: value
        });

    }

    blur() {
        this.inputRef.current?.blur();
    }

    onKeyDown(key: string) {
        const { onKeyDown, onChange } = this.props;
        const { searchValue, selectedOption } = this.state;
        const options = this.filterOptions(searchValue);
        if (options.length > 0) {
            let selected = selectedOption;
            if (key === "ArrowUp") {
                let index = options.findIndex(p => p === selectedOption);
                if (index <= 0) {
                    selected = options[options.length - 1];
                }
                else {
                    selected = options[index - 1];
                }
                this.setState({ selectedOption: selected });
                onChange(selected);
            }

            if (key === "ArrowDown") {
                let index = options.findIndex(p => p === selectedOption);
                if (index < options.length - 1) {
                    selected = options[index + 1];
                }
                else {
                    selected = options[0];
                }
                this.setState({ selectedOption: selected });
                onChange(selected);
            }

            if (key === "Tab") {
                this.setState({ isShowDropdown: false })
            }
        }

        onKeyDown(key);
    }

    renderOption(option: string) {
        const { searchValue } = this.state;
        if(searchValue && option.includes(searchValue)){
            return <>
            <span>{option.split(searchValue)[0]}</span>
            <span className="typed">{searchValue}</span>
            <span>{option.split(searchValue)[1]}</span>
        </>
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
            searchValue,
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
                    {this.filterOptions(searchValue).map(option =>
                        <li className={option === selectedOption ? 'selected' : ''}>
                            {this.renderOption(option)}
                        </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default AutoCompleteInput;