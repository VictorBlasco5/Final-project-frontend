import "./CButton.css"

export const CButton = ({ title, className, functionEmit}) => {

    return (
        <div className={className} onClick={functionEmit}>
            {title}

        </div>
    )
}