import "./CInput.css"

export const CInput = ({ className, placeholder, type, name, nickname, value, disabled, changeEmit, onBlurFunction}) => {    return (
        <input 
        className={className}
        placeholder={placeholder}
        type={type}
        name={name}
        nickname={nickname}
        value={value}
        disabled={disabled}
        onChange={(e)=>changeEmit(e)}
        onBlur={onBlurFunction}
        />
    )
}