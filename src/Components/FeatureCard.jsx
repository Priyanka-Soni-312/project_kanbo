import React from 'react';
import './TaskBoard.css';
import InitialsSVG from '../util/GenerateSVG';

const FeatureCard = ({ task, type, users }) => {
    // console.log("status", task.status.split(' ').join('-'));
    // console.log(type, "status
    // if (type != "status") {
    //     console.log("hello")
    // }
    return (
        <div className="task-card">
            <div className="card-header">
                <span className="task-id column-light-font">{task.id}</span>
                {type != "userId" &&
                    <div className="user-avatar">
                        <InitialsSVG userId={task.userId} users={users} className="avatar-img" />
                    </div>
                }
            </div>
            {/* Assuming the image/avatar is part of a profile */}
            {/* <img */}
            {/* src="https://via.placeholder.com/32"
                    alt="User Avatar"
                    className="avatar-img" */}
            {/* /> */}


            <div className="card-title">
                <div>
                    {type != "status" && <img src={`${task.status.split(' ').join('-')}.svg`} className='status-img' />}
                </div>
                <div>
                    {task.title}
                </div>
            </div>
            <div className='card-title'>
                <img src="3-dot-menu.svg" className='three-dots' />
                <div className="label2 feature-request">{task.tag}</div>
            </div>
        </div>
    )
};

export default FeatureCard;
