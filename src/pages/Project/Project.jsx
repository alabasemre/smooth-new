import { useParams } from 'react-router-dom';

function Project() {
    const params = useParams();
    console.log(params);
    return <div>Project {params.projectId}</div>;
}

export default Project;
