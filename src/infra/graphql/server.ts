import { ApolloServer } from 'apollo-server';
import { authContext } from './context/auth.context';
import schema from './schema';

const setHttpPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }: { response: any }) {
        response.http.headers.set('Custom-Header', 'hello');
        if (response?.errors?.[0]?.message === 'teapot') {
          response.http.status = 404;
        }
      },
    };
  },
};

const server = new ApolloServer({
  schema,
  context: authContext,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [setHttpPlugin],
});

export { server };
