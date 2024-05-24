import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import NewProjectForm from '../../components/Forms/NewProjectForm';
import NestedSidebar from '../../components/NestedSidebar/NestedSidebar';

import styles from './Projects.module.css';
import { useSelector } from 'react-redux';
import { useGetUsersProjectsQuery } from '../../store/apis/projectApi';

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
