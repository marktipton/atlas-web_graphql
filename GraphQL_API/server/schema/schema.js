const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const Project = require('../models/project');
const Task = require('../models/task');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      async resolve(parent, args) {
        return await Task.find({ projectId: parent.id });
      }
    }
  })
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      async resolve(parent, args) {
        return await Project.findOne({ id: parent.projectId });
      }
    }
  })
});


// const tasks = [
//   {
//     id: '1',
//     title: 'Create your first webpage',
//     weight: 1,
//     description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
//     projectId: '1'
//   },
//   {
//     id: '2',
//     title: 'Structure your webpage',
//     weight: 1,
//     description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
//     projectId: '1'
//   }
// ];

// const projects = [
//   {
//     id: '1',
//     title: 'Advanced HTML',
//     weight: 1,
//     description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!'
//   },
//   {
//     id: '2',
//     title: 'Bootstrap',
//     weight: 1,
//     description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.'
//   }
// ];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Task.findOne({ id: args.id });
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Project.findOne({ id: args.id });
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Task.find({});
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Project.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt)},
        description: { type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(parent, args) {
        const { id, title, weight, description } = args;
        const project = new Project({
          id,
          title,
          weight,
          description
        });
        return await project.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt)},
        description: { type: new GraphQLNonNull(GraphQLString)},
        project: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const { id, title, weight, description, projectId } = args;
        const task = new Task({
          id,
          title,
          weight,
          description,
          projectId
        });
        return await task.save();
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
