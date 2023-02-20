const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080
const TypeDefs = require('./graphql/Schema')
const Resolvers = require('./graphql/Resolvers')
const {ApolloServer} = require('apollo-server-express')

const MONO_ACCESS = 'mongodb+srv://ostap3133:ostap3133@cluster0.vffzx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONO_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})

const app = express();
app.use(bodyParser.json());
app.use('*', cors());


app.listen({port: PORT}, async () => {
    console.log(`Server started at port ${PORT}/graphql`)
    await server.start()
    server.applyMiddleware({app})
})
