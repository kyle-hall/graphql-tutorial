const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of a HackerNews clone`,
    feed: (root, args, context, info) => context.prisma.links(),
    link: (parent, args, context, info) =>
      context.prisma.find({
        id: args.id
      })
  },
  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
