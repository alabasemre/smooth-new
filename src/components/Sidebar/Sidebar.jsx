import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuArrowLeftFromLine, LuArrowRightFromLine } from 'react-icons/lu';
import { FaRegFolder } from 'react-icons/fa6';
import { AiOutlineTeam } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import emptyUser from '../../assets/user.png';
import styles from './Sidebar.module.css';

const ToggleSize = 16;

function Sidebar() {
    const [open, setOpen] = useState(true);
    const IconSize = open ? 20 : 22;

    return (
        <div
            className={styles['sidebar-container']}
            style={{ width: !open ? '72px' : '220px' }}
        >
            <button
                className={styles['toggle']}
                onClick={() => setOpen((state) => !state)}
            >
                {open ? (
                    <LuArrowLeftFromLine size={ToggleSize} />
                ) : (
                    <LuArrowRightFromLine size={ToggleSize} />
                )}
            </button>
            <div className={styles['profile-img']}>
                <img src={emptyUser} alt='' />
                {open && <p>Emre Alabaş</p>}
            </div>

            <div
                className={styles['nav-container']}
                style={{ alignItems: !open ? 'center' : '' }}
            >
                <NavLink className={styles['nav-link']} to='/dashboard' end>
                    <FaRegFolder size={IconSize} />
                    {open && <span>Projeler</span>}
                </NavLink>
                <NavLink className={styles['nav-link']} to='teams'>
                    <AiOutlineTeam size={IconSize} />
                    {open && <span>Takımlar</span>}
                </NavLink>
                <NavLink className={styles['nav-link']} to='notifications'>
                    <IoMdNotificationsOutline size={IconSize} />
                    {open && <span>Bildirimler</span>}
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
