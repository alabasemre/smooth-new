import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import NewProjectForm from '../../components/Forms/NewProjectForm';
import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';

import styles from './Projects.module.css';

const mock = [
    {
        id: 1,
        name: 'Lorem ipsum dolor',
        memberCount: 30,
        team: 'Marvel',
        isActive: true,
        sprintCount: 3,
        startDate: '2015-01-01',
        owner: true,
        endDate: '',
        issueCount: 29,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
    {
        id: 2,
        name: 'Amet Consectetur Adipisicing',
        memberCount: 36,
        isActive: false,
        team: 'DC',
        sprintCount: 0,
        startDate: '2015-01-01',
        owner: false,
        endDate: '2020-02-04',
        issueCount: 0,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing',
    },
];

function Projects() {
    const [isModalOpen, setModalOpen] = useState(false);

    const modalToggle = () => {
        setModalOpen((state) => !state);
    };

    return (
        <section className={styles['projects']}>
            <NestedSidebar data={mock} path={'project'}>
                <div className={styles['page-header']}>
                    <h1>Proje Listesi</h1>
                    <button
                        className={styles['new-project-button']}
                        onClick={modalToggle}
                    >
                        Yeni Proje
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
        </section>
    );
}

export default Projects;
