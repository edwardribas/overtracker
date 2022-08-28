import styles from './styles.module.scss';

export const Input = ({
    value, 
    setValue, 
    placeholder, 
    onSubmit: handleSearch,
    isLoading
}) => {

    window.onkeydown = e => {
        if (e.key === "Enter" && !isLoading) {
            handleSearch(value);
        }
    }

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder=" "
                autoComplete="off"
                autoFocus
                disabled={isLoading}
            />
            <label className={styles.label}>
                {placeholder}
            </label>

            <button disabled={isLoading} onClick={() => handleSearch(value)}>Buscar</button>
        </div>
    )
}