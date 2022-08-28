import { Input } from '../../components/Input';
import { PlayersList } from '../../components/PlayersList';
import { useEffect, useState } from 'react';
import Logo from '../../assets/img/owlogo.svg';
import Reminder from '../../assets/img/reminder.svg';
import Searching from '../../assets/img/searching.svg';
import styles from './styles.module.scss';
import SearchRequest from '../../utils/SearchRequest';

const fetchPortraits = new SearchRequest('/getPortraits');
const fetchNames = new SearchRequest('/getNames');

export const Finder = () => {
    const [value, setValue] = useState('');
    const [playersFound, setPlayersFound] = useState([]);
    const [portraits, setPortraits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        fetchPortraits.fetch().then(res => {
            setPortraits(res);
            setIsLoading(false);
        });
    }, [])

    const handleSearch = async (value) => {
        if (portraits.length < 1) return;
        const name = value.trim().toLowerCase();
        if (name.length === 0) {
            setIsLoading(false);
            setSearched(false)
            setPlayersFound([]);
            return;
        }
        setIsLoading(true);
        const res = await fetchNames.fetch({ name });
        setIsLoading(false);
        if (res.length === 0) setSearched(true)
        setPlayersFound(res);
    }

    return (
        <main>
            <img src={Logo} alt="Overwatch Logo" className={styles.logo}/>
            <Input value={value} setValue={setValue} placeholder="Nome do usuário" onSubmit={handleSearch} isLoading={isLoading}/>
            
            {playersFound && playersFound.length > 0 && !isLoading &&(
                <PlayersList playersInfo={playersFound} portraits={portraits}/>
            )}

            {playersFound && playersFound.length === 0 && searched && !isLoading && (
                <div className={styles.content}>
                    <img src={Reminder} alt="Man beside an smartphone."/>
                    <p>Nenhum dado foi encontrado com essa busca!</p>
                </div>
            )}

            {playersFound && playersFound.length === 0 && !searched && !isLoading && (
                <div className={styles.content}>
                    <img src={Searching} alt="Man looking for phone signal."/>
                    <p>Digite o nome de usuário que deseja buscar.</p>
                </div>
            )}

            {isLoading && (
                <span className={styles.loader}>
                    <span></span>
                </span>
            )}
        </main>
    )
}