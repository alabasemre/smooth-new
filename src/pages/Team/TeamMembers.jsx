import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './Team.module.css';
import EditTeamUserForm from '../../components/Forms/EditTeamUserForm';
import { useParams } from 'react-router-dom';
import { useGetTeamsUsersQuery } from '../../store/apis/teamApi';
import { useSelector } from 'react-redux';

const appUsers = [
    {
        id: 1,
        name: 'Emre',
        surname: 'Alabaş',
        email: 'emre@mail.com',
        title: 'Front End Developer',
    },
    {
        id: 2,
        name: 'Ahsen',
        surname: 'Bilgili',
        email: 'ahsen@mail.com',
        title: 'Back End Developer',
    },
    {
        id: 3,
        name: 'Oğuz',
        surname: 'Doğan',
        email: 'oguz@mail.com',
        title: 'Back End Developer',
    },
];

function TeamMembers({ isAdmin }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [user, setUser] = useState(null);
    const params = useParams();
    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetTeamsUsersQuery({
        teamId: params.teamId,
        token: userInfo.token,
    });

    const handleOpenModal = (user) => {
        setUser(user);
        setIsEditOpen(true);
    };

    const handleModal = () => {
        setIsEditOpen(false);
    };

    return (
        <div className={styles['team_members-container']}>
            {isEditOpen && (
                <Modal isOpen={isEditOpen} setIsOpen={handleModal}>
                    <EditTeamUserForm
                        user={user}
                        teamId={params.teamId}
                        closeModal={handleModal}
                    />
                </Modal>
            )}
            <table className={styles['team_members-table']}>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>E-Posta</th>
                        <th>Ünvan</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {isAdmin && (
                                    <>
                                        <button
                                            className={
                                                styles[
                                                    'team_members-table-actions'
                                                ]
                                            }
                                            onClick={() => {
                                                handleOpenModal(user);
                                            }}
                                        >
                                            Düzenle
                                        </button>
                                        <button
                                            className={
                                                styles[
                                                    'team_members-table-actions'
                                                ]
                                            }
                                        >
                                            Takımdan Çıkar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamMembers;
