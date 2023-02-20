const Employee = require('../models/Employee');
const User = require('../models/User')


exports.resolvers = {
    Query: {
        login: async (_, {username, password}) => {

            if (!username || !password) throw new Error("username and password are required")
            const user = await User.findOne({username});

            if (!user) throw new Error("Incorrect email or password")

            return {status: true, "message": "Successfully logged in", username: user.username}

        },
        getEmployees: async (parent, args) => {
            return Employee.find({});
        },
        getEmployeeByID: async (parent, args) => {


            if (!args.id) {
                return JSON.stringify({status: false, "message": "No ID found"});
            }

            return Employee.find({_id: args.id});
        },

        getEmployeesByFirstName: async (parent, args) => {
            if (!args.firstName) {
                return JSON.stringify({status: false, message: "No records with this first name"});
            }
            return Employee.find({first_name: args.firstName});
        },
        getEmployeesByLastName: async (parent, args) => {
            if (!args.lastName) {
                return JSON.stringify({status: false, message: "No records with this last name"});
            }
            return Employee.find({last_name: args.firstName});
        },
    },

    Mutation: {
        addEmployee: async (parent, {input}) => {
            if (!input) throw new Error("Fields can not be empty or incorrect format")

            let newEmp = new Employee({
                first_name: input.first_name,
                last_name: input.last_name,
                email: input.email,
                gender: input.gender,
                salary: input.salary
            });

            return newEmp.save();
        },

        updateEmployee: async (parent, {input}) => {
            if (!input.id) throw new Error("Employee ID is required for updating.")


            const update = {};
            if (input.first_name) update.first_name = input.first_name
            if (input.last_name) update.last_name = input.last_name
            if (input.email) update.email = input.email
            if (input.gender) update.gender = input.gender

            if (input.salary) update.salary = input.salary

            return Employee.findOneAndUpdate(
                {_id: input.id},
                {$set: update},
                {new: true}
            );
        },

        deleteEmployee: async (parent, args) => {
            if (!args.id) return JSON.stringify({status: false, "message": "No ID found"})
            await Employee.findByIdAndDelete(args.id)
            return JSON.stringify({status: true, message: "Deleted"})
        },

        signup: async (parent, args) => {

            if (!args) throw  new Error("Some fields are empty")

            const existingUser = await User.findOne({email: args.email})

            if (existingUser) throw new Error("User already exist")

            const user = new User(args)
            await user.save()
            return JSON.stringify({status: true, message: "Registered"})
        }
    }
}