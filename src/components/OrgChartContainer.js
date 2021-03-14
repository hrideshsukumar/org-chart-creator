import React, { useState } from 'react';
import OrgChart from './OrgChart';

const google = window.google;
google.charts.load('current', { packages: ["orgchart"] });

const OrgChartContainer = () => {
    const defaultPositions = [
        { title: "CTO", parentId: 0, id: 491 },
        { title: "Architect", parentId: 491, id: 493 },
        { title: "QA Tester", parentId: 498, id: 492 },
        { title: "Brand Manager", parentId: 496, id: 494 },
        {
            title: "Business Analyst",
            id: 495,
            parentId: 494,
        },
        {
            title: "Account Manager",
            parentId: 494,
            id: 496,
        },
        { title: "Product Manager", parentId: 491, id: 497 },
        { title: "Software Developer - Mid Level", parentId: 499, id: 498 },
        { title: "Software Developer - Senior", parentId: 493, id: 499 },
    ]

    const [positions, setPositions] = useState(defaultPositions);

    const getOrgChart = () => {
        setPositions([...defaultPositions]);
    };

    const update = (id, parentId) => {
        const updatedPositions = [...positions]; 
        const index = updatedPositions.findIndex((position) => position.id === id);
        const position = updatedPositions[index];
        updatedPositions.splice(index, 1, {
            id: position.id,
            title: position.title,
            parentId,
        });
        setPositions([...updatedPositions]);
    };

    return (
        <OrgChart
            positions={positions}
            getOrgChart={getOrgChart}
            update={update}
            google={google}
        />
    );
};

export default OrgChartContainer;