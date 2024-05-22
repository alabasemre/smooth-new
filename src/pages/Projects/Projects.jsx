import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import NewProjectForm from '../../components/Forms/NewProjectForm';
import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';

import styles from './Projects.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUsersProjectsQuery } from '../../store/apis/projectApi';

const mock = [
    {
        id: '1',
        name: 'Project Alpha',
        startDate: '01-01-2015',
        endDate: '',
        memberCount: 35,
    },
    {
        id: '2',
        name: 'Project Zeta',
        startDate: '01-01-2015',
        endDate: '01-01-2019',
        memberCount: 0,
    },
];

function Projects() {
    const [isModalOpen, setModalOpen] = useState(false);

    const { userInfo } = useSelector((s) => s.user);
    const { data, isFetching, error } = useGetUsersProjectsQuery({
        token: userInfo.token,
    });

    const modalToggle = () => {
        setModalOpen((state) => !state);
    };

    return (
        <section className='nested-outer-container'>
            {!isFetching && (
                <NestedSidebar data={data} path={'project'}>
                    <div className='nested-page-header'>
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
            )}
        </section>
    );
}

export default Projects;
