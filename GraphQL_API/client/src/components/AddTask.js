import {
  useState,
  //useEffect
} from "react";


function AddTask(props) {
  const [inputs, setInputs] = useState({
    title: '',
    weight: 1,
    description: '',
    projectId: ''
  });


  const handleChange = (e) => {
        const newInputs = {
          ...inputs
        };
        if (e.target.name === "weight") newInputs[e.target.name] = parseInt(e.target.value)
        else newInputs[e.target.name] = e.target.value
        setInputs(newInputs)
  }

  return ( <
    form class = "task"
    id = "add-task"
    /*onSubmit = {...}*/ >
    <
    div className = "field" >
    <
    label > Task title: < /label> <
    input type = "text"
    name = "title"
    onChange = {
      handleChange
    }
    value = {
      inputs.title
    }
    required /
    >
    < /
    div > <
    div className = "field" >
    <
    label > Weight: < /label> <
    input type = "number"
    name = "weight"
    onChange = {
      handleChange
    }
    value = {
      inputs.weight
    }
    required /
    >
    < /
    div >
    <
    div className = "field" >
    <
    label > description: < /label> <
    textarea name = "description"
    onChange = {
      handleChange
    }
    value = {
      inputs.description
    }
    required /
    >
    < /
    div >
    <
    div className = "field" >
    <
    label > Project: < /label> <
    select name = "projectId"
    onChange = {
      handleChange
    }
    value = {
      inputs.projectId
    }
    required > < option value = ""
    selected = "selected"
    disabled = "disabled" > Select project < /option>  < /
    select > < /
    div >
    <
    button > + < /button> < /
    form >
  );
}

export default AddTask;

// import { gql } from 'apollo-boost';
// import { graphql } from 'react-apollo';
// import React from 'react';

// // Define the GraphQL query
// const getProjectsQuery = gql`
//   {
//     projects {
//       id
//       title
//     }
//   }
// `;

// // AddTask component
// function AddTask(props) {
//   const { loading, error, data } = props.data;

//   if (loading) {
//     return <div>Loading projects...</div>;
//   }

//   if (error) {
//     console.error('Error loading projects:', error);
//     return <div>Error loading projects</div>;
//   }

//   return (
//     <div>
//       <h2>Add Task</h2>
//       <form>
//         <label>Title:</label>
//         <input type="text" />

//         <label>Project:</label>
//         <select>
//           <option>Select Project</option>
//           {data.projects.map(project => (
//             <option key={project.id} value={project.id}>
//               {project.title}
//             </option>
//           ))}
//         </select>

//         <button>Add Task</button>
//       </form>
//     </div>
//   );
// }

// // Bind the query to the component
// export default graphql(getProjectsQuery)(AddTask);
