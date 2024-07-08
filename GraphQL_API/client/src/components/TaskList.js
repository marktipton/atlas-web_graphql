// import React from "react";
// import { gql } from 'apollo-boost';
// import { graphql } from 'react-apollo';
// import TaskDetails from './TaskDetails'; // Assuming you have TaskDetails component

// // Define the GraphQL query
// const getTasksQuery = gql`
//   {
//     tasks {
//       id
//       title
//     }
//   }
// `;

// // TaskList component
// function TaskList(props) {
//   const { loading, error, data } = props.data;

//   if (loading) {
//     return <div>Loading tasks...</div>;
//   }

//   if (error) {
//     console.error('Error loading tasks:', error);
//     return <div>Error loading tasks</div>;
//   }

//   return (
//     <div>
//       <h2>Task List</h2>
//       <ul id="task-list">
//         {data.tasks.map(task => (
//           <li key={task.id}>{task.title}</li>
//         ))}
//       </ul>
//       <TaskDetails />
//     </div>
//   );
// }

// // Bind the query to the component
// export default graphql(getTasksQuery)(TaskList);
import {
  useState,
  //useEffect
} from "react";
// components
import TaskDetails from './TaskDetails';

function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  });

  return ( <
    div >
    <
    ul id = "task-list" > {

    } <
    /ul>  <
    TaskDetails /
    > < /
    div >
  );
}

export default TaskList;
