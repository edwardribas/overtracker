import { SiPlaystation, SiNintendoswitch, SiXbox } from "react-icons/si";
import { Link } from "react-router-dom";
import { MdDesktopWindows } from "react-icons/md";
import styles from './styles.module.scss';

export const PlayersList = ({playersInfo, portraits}) => {
    return (
        <div className={styles.players}>
            {playersInfo.map((obj, i) => {
                const {name, level, isPublic, platform, portrait, urlName} = obj;
                const path = `/user/${urlName}`;

                return (
                    <div key={i}>
                        <img src={portraits[portrait].icon} alt="Player portrait"/>
                        <h3>{name}</h3>
                        <div className={styles.emblemas}>
                            <span>{level.toLocaleString('pt-br', {

                            })}</span>
                            {platform === 'pc' && (
                                <span>
                                    {name.slice(name.indexOf('#'))}
                                </span>
                            )}
                            <span className={styles.platform}>{
                                platform === 'pc' ? (<MdDesktopWindows/>)
                                : platform === 'psn' ? (<SiPlaystation/>)
                                : platform === 'nintendo-switch' ? (<SiNintendoswitch/>)
                                : (<SiXbox/>)
                            }</span>
                        </div>
                        <p>{isPublic ? "Perfil público" : "Perfil privado"}.</p>
                     
                        <Link to={path} target="_blank" className={styles.button}>Perfil</Link>
                    </div>
                )
            })}
        </div>
    )
}