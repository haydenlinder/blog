# Protected Routes in Next.js

Author: [Hayden Linder](https://github.com/haydenlinder)

5/15/2021

<br/>

<hr/>

<br/>

## What are Protected Routes?

Anyone with experience building or working on an application with authentication is probably familiar with the concept of protected routes. Protected routes is the idea that, depending on whether a user *is* or *is not* logged in, there are certain pages they shouldn't be able to see.

For example, let's say you have a social media app. You'd like everyone to be able to visit informational pages like **/about** and **/privacy**, but users who *are not* logged in shouldn't be able to see other people's profiles or any pages behind **/app/...**, and users who *are* logged in shouldn't be able to see the **/login** page.

## Implementation

We could do this on a page-by-page basis, but in an effort to not repeat ourselves, it would be nice to write a top-level script that would check these conditions on every page request.

We can use a feature in Next.js called [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps), which allows us to intercept a page request and its **ctx**, which contains information about the request, and run logic before sending the response.

Let's write a function called **useSessionConditionRedirect** in its own file that takes a **ctx** parameter.

```js
// /hooks/useSessionConditionRedirect.js

import Router from 'next/router';

// Helper function
const redirect = (res, location) => {
    if (res) { // server
        res.writeHead(302, {
            Location: location
        });
        res.end();
    } else { // client
        Router.push(location);
    }
    return {};
};

export const useSessionConditionRedirect = async ({ ctx }) => {
    // `req` will be available on the server 
    // otherwise we will use `ctx.pathname`
    const { req, res } = ctx;

    const path = req?.url || ctx.pathname;
    const isProtected = (path === '/app' || path.slice(0,5) === '/app/');

    // Call your auth API
    const isLoggedIn = await isLoggedInAPI();

    // Logged out and requests '/app' or '/app/...'
    if (!isLoggedIn && isProtected) {
        return redirect(res, '/');
    }

    // Logged in and requests '/signup' or '/'
    else if (isLoggedIn && !isProtected) {
        return redirect(res, '/app')
    }

    // They are in the right place
    else 
    // You could make more API calls here.
    return {
        //
        pageProps: {
            postNames: [`post1`, `post2`, `post3`]
        },
    };
}
```

Now all we have to do is import this function into **/pages/_app.js**, which contains the top-level page component **MyApp**, and set is as **MyApp.getInitialProps**.

This will run the logic we just wrote on *every* page request.

```jsx
// /pages/_app.jsx

import { useSessionConditionRedirect } from '../hooks/useSessionConditionRedirect';

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

MyApp.getInitialProps = async ctx => useSessionConditionRedirect(ctx);

export default MyApp;
```