import React, { useState, useEffect, Fragment } from 'react';
import OrgChart from './OrgChart';
import chartService from '../services/ChartService';
import shortid from 'shortid';

const google = window.google;
google.charts.load('current', { packages: ["orgchart"] });

const OrgChartContainer = () => {
    // let defaultPositions = []
    // useEffect(() => {
    //     fetchNodes()
    // }, []);

    const fetchNodes = async () => {
        const result = await chartService.get('/charts');
        if (result.data) {
            return result.data
        }
        return []
    }
    // const defaultPositions = [
    //     { title: "CTO", parentId: 0, id: 491 },
    //     { title: "Architect", parentId: 491, id: 493 },
    //     { title: "QA Tester", parentId: 498, id: 492 },
    //     { title: "Brand Manager", parentId: 496, id: 494 },
    //     {
    //         title: "Business Analyst",
    //         id: 495,
    //         parentId: 494,
    //     },
    //     {
    //         title: "Account Manager",
    //         parentId: 494,
    //         id: 496,
    //     },
    //     { title: "Product Manager", parentId: 491, id: 497 },
    //     { title: "Software Developer - Mid Level", parentId: 499, id: 498 },
    //     { title: "Software Developer - Senior", parentId: 493, id: 499 },
    // ]

    const [positions, setPositions] = useState([]);

    const getOrgChart = async () => {
        const defaultPositions = await fetchNodes();
        console.log(defaultPositions);
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

    const addNode = () => {
        const node = {
            id: shortid.generate(),
            title: "New user",
            parentId: 0
        }
        setPositions([...positions, node])
    }

    const save = async () => {
        const { data } = await chartService.post('/charts', positions);
        console.log(data);
    }

    return (
        <Fragment>
            <div className="ui menu">
                <div className="item">
                    <div onClick={addNode} className="ui primary button">Add node</div>
                </div>
                <div className="right menu">
                    <div className="item">
                        <div onClick={save} className="ui button">Save chart</div>
                    </div>
                </div>
            </div>
            <OrgChart
                positions={positions}
                getOrgChart={getOrgChart}
                update={update}
                google={google}
            />
        </Fragment>
    );
};

export default OrgChartContainer;