import React, { useContext, useEffect, useState } from 'react';
import './TaskBoard.css'; // CSS for styling the board
import FeatureCard from './FeatureCard';
import { GroupContext } from '../ContextProviderStates/GroupContext';
import { OrderContext } from '../ContextProviderStates/OrderingContext';

import InitialsSVG from '../util/GenerateSVG';


const categories = {
    "status": ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'],
    "userId": [],
    "priority": [4, 3, 2, 1, 0]
};

const priority_map = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
}

const TaskBoard = () => {
    const [tasks, setTasks] = useState(null);
    const [tasks2, setTasks2] = useState(null);
    const [users, setUsers] = useState(null);
    const fetchTasks = async () => {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const data = await response.json();
            setTasks2(data);
            categories.userId = data.users.map(user => user.id);
            // console.log("Categories:", categories)
            setUsers(data.users);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchTasks();
    }, []);
    const { group } = useContext(GroupContext);
    const { order } = useContext(OrderContext);
    const groupBy = () => {
        if (tasks2 == null) {
            return;
        }
        let temp_tasks = [];
        const map = new Map();
        categories[group].forEach(element => {
            map.set(element, []);
        });
        tasks2.tickets.forEach(element => {
            const str = element[group];
            if (map.get(str) == null) {
                map.set(str, []);
            }
            map.get(str).push(element)
        });
        map.forEach((value, key) => {
            // console.log("key", key, "value", value)
            let name = undefined;
            if (group === "userId") {
                name = users.find(user => user.id === key).name;
            }
            temp_tasks.push({ type: key, data: value, name: name });
        })
        setTasks(temp_tasks);
    }

    const orderBy = () => {
        if (tasks == null)
            return;
        const sortTitle = (a, b) => {
            let str1 = a["title"], str2 = b["title"];
            if (str1.toLowerCase() < str2.toLowerCase()) return -1;
            if (str1.toLowerCase() > str2.toLowerCase()) return 1;
            return 0;
        };
        const sortPriority = (a, b) => {
            return a.priority - b.priority;
        }
        let temp_tasks = JSON.parse(JSON.stringify(tasks));
        for (let i = 0; i < tasks.length; i++) {
            if (order == "title") {
                temp_tasks[i].data.sort(sortTitle);
            }
            else {
                temp_tasks[i].data.sort(sortPriority);
            }
        }
        // for (let i = 0; i < temp_tasks.length; i++) {
        //     for (let j = 0; j < temp_tasks[i].data.length; j++)
        //         console.log(temp_tasks[i].data[j].title)
        //     console.log("------------------");
        // }

        setTasks(temp_tasks)
    }
    useEffect(() => {
        groupBy(group);
    }, [group, tasks2])
    useEffect(() => {
        orderBy(order);
    }, [order, tasks2])
    return (
        <>
            {
                tasks != null ? <div className="board">
                    {tasks.map((element) => (
                        <Column type={group} title={element.type} name2={element.name} users={users} num={element.data.length} tasks={element.data} />
                    ))}
                </div > : <div></div>
            }
        </>
    );
};

const Column = ({ type, title, tasks, num, users, name2 }) => {
    let name = title;
    if (type === "userId") {
        name = name2;
    }
    else if (type === "priority" && name !== "priority") {
        name = priority_map[title];
    }
    return (
        <div className="column">
            <div className='column-container'>
                <div className='column-header'>
                    {
                        type === "status" && <div><img src={`${title.split(' ').join('-')}.svg`} className='column-status-img' /> </div>
                    }
                    {
                        type === "userId" && users && <div> <InitialsSVG userId={title} users={users} className="column-avatar-img" /> </div>
                    }
                    {
                        type === "priority" && users && <div> <img src={`${title}.svg`} className='column-priority-img' /> </div>
                    }
                    <h3 className='column-title-font'>{name} <span className='column-light-title-font'>{num}</span></h3>
                </div>
                <div>
                    <img src='add.svg' className='symbol' />
                    <img src='3-dot-menu.svg' className='symbol' />
                </div>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <FeatureCard type={type} users={users} task={task} />
                ))}
            </div>
        </div>
    )
};



export default TaskBoard;
