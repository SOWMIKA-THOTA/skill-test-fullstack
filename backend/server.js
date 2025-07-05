const express = require("express");
const cors = require("cors");
const {
  graphqlHTTP
} = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} = require("graphql");

const app = express();
app.use(cors());


let employees = [
  {
    id: 1,
    name: "Alice",
    age: 30,
    class: "A",
    subjects: ["Math", "Science"],
    attendance: 95
  },
  {
    id: 2,
    name: "Bob",
    age: 25,
    class: "B",
    subjects: ["English", "History"],
    attendance: 89
  },
  {
    id: 3,
    name: "Charlie",
    age: 28,
    class: "C",
    subjects: ["Physics", "Chemistry"],
    attendance: 92
  }
];

// Employee Type
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    class: { type: new GraphQLNonNull(GraphQLString) },
    subjects: { type: new GraphQLList(GraphQLString) },
    attendance: { type: GraphQLFloat }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employees: {
      type: new GraphQLList(EmployeeType),
      args: {
        page: { type: GraphQLInt },
        pageSize: { type: GraphQLInt },
        class: { type: GraphQLString },
        minAge: { type: GraphQLInt },
        maxAge: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let filtered = employees;

        if (args.class) {
          filtered = filtered.filter(emp => emp.class === args.class);
        }
        if (args.minAge) {
          filtered = filtered.filter(emp => emp.age >= args.minAge);
        }
        if (args.maxAge) {
          filtered = filtered.filter(emp => emp.age <= args.maxAge);
        }

        if (args.page && args.pageSize) {
          const start = (args.page - 1) * args.pageSize;
          return filtered.slice(start, start + args.pageSize);
        }

        return filtered;
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return employees.find(emp => emp.id === args.id);
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        class: { type: new GraphQLNonNull(GraphQLString) },
        subjects: { type: new GraphQLList(GraphQLString) },
        attendance: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        const newEmp = { ...args, attendance: parseFloat(args.attendance), };
        employees.push(newEmp);
        return newEmp;
      }
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        class: { type: GraphQLString },
        subjects: { type: new GraphQLList(GraphQLString) },
        attendance: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        const emp = employees.find(e => e.id === args.id);
        if (!emp) throw new Error("Employee not found");

        Object.assign(emp, {...args, attendance: parseFloat(args.attendance),});
        return emp;
      }
    }
  }
});

// Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

// Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Start Server
app.use(express.json());

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "employee", password: "emp123", role: "employee" }
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});


app.listen(5000, () => {
  console.log("GraphQL server running on http://localhost:5000/graphql");
});
