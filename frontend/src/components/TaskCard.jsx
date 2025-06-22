import './TaskCard.css'

export default function TaskCard(props) {

    return (
        <div key={props.task.key} id="taskCard" className='taskCard'>
            <div id='taskNameContainer' className='taskNameContainer'>
                <span id='checkBox'>
                    <input type='checkbox' checked={props.task.completed} />
                </span>
                <span id='taskName'>{props.task.title}</span>
            </div>
            <div id="cardActions" className='cardActions'>
                <button id='editButton' onClick={() => props.onEdit(props.task)} className='actionButton'>Edit</button>
                <button id='deleteButton' onClick={() => props.onDelete(props.task)} className='actionButton deleteButton'>Delete</button>
            </div>
        </div>
    )
}