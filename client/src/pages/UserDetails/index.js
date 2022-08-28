import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchRequest from '../../utils/SearchRequest';
import styles from './styles.module.scss';

const fetchPlayer = new SearchRequest('/getUser');

export const UserDetails = () => {
    const { battleTag } = useParams();
    const [response, setResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchPlayer.fetch({battleTag}).then(res => {
            setResponse({...res})
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        console.log(response)
    }, [response])

    return (
        <main>
            {isLoading && (
                <p>carregando...</p>
            )}
            <h1 className={styles.title}>{battleTag}</h1>
            {!isLoading && response.ok && (
                <img src={response.linkPortrait}/>
            )}
        </main>
    )
}