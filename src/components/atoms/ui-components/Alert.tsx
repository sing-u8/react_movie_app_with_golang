type Props = {
    alertType: string;
    alertMessage: string;
};

const Alert: React.FC<Props> = props => {
    return (
        <div className={`alert ${props.alertType}`} role="alert">
            {props.alertMessage}
        </div>
    );
};

export default Alert;
