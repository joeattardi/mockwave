# Mockwave

Have you ever had to delay your UI development to wait for a backend team to implement the APIs you need?

Mockwave lets you create mock API endpoints while seamlessly proxying all other requests to the real API, combining the flexibility of mocking with the reliability of a live backend.

While you wait for the API team to implement the new APIs you need for your UI development, you can create temporary endpoints that return mock or test data.

## Getting started

Install Mockwave in your project:

```
npm install mockwave
```

## Creating mock APIs

Mockwave uses [Fastify](https://fastify.dev/) under the hood for mock API routes. Routes are defined using Fastify handler functions. This gives you the full power of the Fastify framework. Your mock APIs can return static data or contain logic.

Mock APIs are defined in a JavaScript file. The convention is for the file name to end with `.mock.js`, but this is just a convention and is not required.

The file should have a default export which is a function. The function takes one argument, `server`, which is the underlying Fastify instance. From here, you can define your own mock endpoints and their data or behavior.

See the [Fastify documentation](https://fastify.dev/docs/latest/Reference/Routes/) for more details on adding routes.

## Example

Here is an example mock file:

```javascript
export default function myMock(app) {
    app.get('/api/test', (request, reply) => {
        reply
            .code(200)
            .send({ hello: 'world' });
    });
}
```

## Running Mockwave

Once you have your mocks defined in a mock file, you can start Mockwave. You'll need the file name of the mock as well as the URL you want to proxy other requests to.

The structure of the command is:

```
npx mockwave -t <proxy target> <mock file name>
```

Assuming you want to proxy to `https://httpbin.org` and your mock file is called `myMock.mock.js`, the command is as follows:

```
npx mockwave -t https://httpbin.org myMock.mock.js
```

By default, Mockwave listens on port 8000. If you need a different port, you can specify the `-p` option and enter a different port number.
