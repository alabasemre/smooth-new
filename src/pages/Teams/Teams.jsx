import { Outlet, useParams } from 'react-router-dom';
import styles from './Teams.module.css';
import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';
import Modal from '../../components/Modal/Modal';
import NewProjectForm from '../../components/Forms/NewProjectForm';
import { useState } from 'react';

const teams = [
    {
        id: 1,
        name: 'Takım Marvel',
        memberCount: 30,
        isActive: true,
        startDate: '2015-01-01',
        owner: true,
        endDate: '',
        issueCount: 29,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
    {
        id: 2,
        name: 'Takım DC',
        memberCount: 36,
        isActive: false,
        startDate: '2015-01-01',
        owner: false,
        endDate: '2020-02-04',
        issueCount: 0,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
];

function Teams() {
    const params = useParams();
    const [isModalOpen, setModalOpen] = useState(false);

    const modalToggle = () => {
        setModalOpen((state) => !state);
    };

    return (
        <section className='nested-outer-container'>
            <NestedSidebar data={teams}>
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
                        <NewProjectForm
                            toggleModal={modalToggle}
                        ></NewProjectForm>
                    </Modal>
                )}
            </NestedSidebar>
            <Outlet />
        </section>
    );
}

export default Teams;
