import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';
import Modal from '../../components/Modal/Modal';
import NewTeamForm from '../../components/Forms/NewTeamForm';

import styles from './Teams.module.css';
import { useGetUsersTeamsQuery } from '../../store/apis/teamApi';
import { useSelector } from 'react-redux';
// const teams = [
//     {
//         id: 1,
//         name: 'Takım Marvel',
//         memberCount: 30,
//         isActive: true,
//         startDate: '2015-01-01',
//         owner: true,
//         endDate: '',
//         issueCount: 29,
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
//     },
//     {
//         id: 2,
//         name: 'Takım DC',
//         memberCount: 36,
//         isActive: false,
//         startDate: '2015-01-01',
//         owner: false,
//         endDate: '2020-02-04',
//         issueCount: 0,
//         description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
//     },
// ];

function Teams() {
    const params = useParams();
    // ASLINDA BU TAKIM VAR MI KONTROLÜ LAZIM
    const [isModalOpen, setModalOpen] = useState(false);
    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetUsersTeamsQuery(userInfo.token);
    const navigate = useNavigate();
    const modalToggle = () => {
        setModalOpen((state) => !state);
    };

    if (!isFetching && data === undefined) {
        navigate('');
    }

    return (
        <section className='nested-outer-container'>
            {isFetching ? (
                <div>Yükleniyor...</div>
            ) : (
                <NestedSidebar data={data}>
                    <div className='nested-page-header'>
                        <h1>Takımlarınız</h1>
                        <button
                            className={styles['new-team-button']}
                            onClick={modalToggle}
                        >
                            Yeni Takım
                        </button>
                    </div>
                    {isModalOpen && (
                        <Modal setIsOpen={modalToggle} isOpen={isModalOpen}>
                            <NewTeamForm
                                toggleModal={modalToggle}
                            ></NewTeamForm>
                        </Modal>
                    )}
                </NestedSidebar>
            )}

            <Outlet />
        </section>
    );
}

export default Teams;
