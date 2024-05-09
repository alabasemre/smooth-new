/* eslint-disable react/prop-types */
import styles from './Auth.module.css';

function Input({
    id,
    label,
    value,
    onChange,
    hasError,
    errorMessage,
    ...rest
}) {
    return (
        <div className={styles['input-group']}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                {...rest}
            />
            {hasError && (
                <p className={styles['error-message']}>{errorMessage}</p>
            )}
        </div>
    );
}

export default Input;
