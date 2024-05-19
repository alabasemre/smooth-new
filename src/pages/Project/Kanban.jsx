import React from 'react';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';

function Kanban() {
    return (
        <section style={{ flex: 1, paddingRight: 20 }}>
            <h1>Pano</h1>
            <KanbanBoard />
        </section>
    );
}

export default Kanban;
