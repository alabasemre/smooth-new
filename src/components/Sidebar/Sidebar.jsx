import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuArrowLeftFromLine, LuArrowRightFromLine } from 'react-icons/lu';
import { FaRegFolder } from 'react-icons/fa6';
import { AiOutlineTeam } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
import emptyUser from '../../assets/user.png';
import styles from './Sidebar.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';

const ToggleSize = 16;

function Sidebar() {
    const [open, setOpen] = useState(true);
    const IconSize = open ? 20 : 24;

    const { userInfo } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

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
                <img
                    src={
                        userInfo.avatarUrl === ''
                            ? emptyUser
                            : userInfo.avatarUrl
                    }
                    alt=''
                />
                {open && (
                    <p>
                        {userInfo.name
                            ? `${userInfo.name} ${userInfo.surname}`
                            : 'Smooth'}{' '}
                    </p>
                )}
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
            <button className={styles['logout-btn']} onClick={logoutHandler}>
                {open && 'Çıkış Yap'} <CiLogout />
            </button>
        </div>
    );
}

export default Sidebar;
