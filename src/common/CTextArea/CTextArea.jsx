import "./CTextArea.css"

export const CTextArea = ({ className, placeholder, type, name, nickname, value, disabled, changeEmit, onBlurFunction}) => {    return (
        <textarea
        className={className}
        placeholder={placeholder}
        type={type}
        name={name}
        nickname={nickname}
        value={value}
        disabled={disabled}
        onChange={changeEmit}
        onBlur={onBlurFunction}
        />
    )
}