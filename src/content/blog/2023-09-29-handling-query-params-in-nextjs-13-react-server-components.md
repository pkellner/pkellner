---
status: publish
published: true
pubDatetime: 2023-09-29T20:00:00.000Z
title: Handling Query Parameters in Next.js 13 React Server Components
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: peter@peterkellner.net
  url: 'https://peterkellner.net'
author_login: admin

display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
description: Next.js has always been at the forefront of providing streamlined experiences for React developers. With the introduction of React Server Components in Next.js 13, the framework has unlocked even greater potential. One of the standout features of these server components is their ability to manage server-side logic directly, eliminating the need for separate API routes. This integration streamlines the process of data fetching and other server-side tasks.

---

## Handling Query Parameters in Next.js 13 React Server Components

Next.js has always been at the forefront of providing streamlined experiences for React developers. With the introduction of React Server Components in [Next.js](https://nextjs.org/) 13, the framework has unlocked even greater potential. One of the standout features of these server components is their ability to manage server-side logic directly, eliminating the need for separate API routes. This integration streamlines the process of data fetching and other server-side tasks.

In this post, we're going to delve deep into handling query parameters in Next.js 13 [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components). Let's get started!

### Crafting the Server Component

First and foremost, let’s examine a server component in a file named `/app/page.tsx`:

```tsx
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q } = searchParams ?? { q: "" };
  const attendees = await findAttendees(q as string);

  return (
    <div className="container">
      <div className="row">
        <p>Put in URL: http://localhost:3001/admin/attendees-list?q=kellner</p>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>PKID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee.Id}>
                  <td>{attendee.Id}</td>
                  <td>{attendee.PKID}</td>
                  <td>{attendee.Username}</td>
                  <td>{attendee.Email}</td>
                  <td>{attendee.UserFirstName}</td>
                  <td>{attendee.UserLastName}</td>
                  <td>{attendee.CreationDate?.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

### Direct Data Access: The Game-Changer

One of the revolutionary features of server components in Next.js 13 is the innate ability to access data directly from within the component. Say goodbye to setting up elaborate REST services or GraphQL endpoints. Because server components execute in the Node.js environment, you have the luxury of communicating with your data sources directly.

Consider the utility function `findAttendees`, which is placed in the same `/app/page.tsx` file:

```tsx
async function findAttendees(query: string) {
  const results = await prisma.attendees.findMany({
    take: 50,
    where: {
      OR: [
        { UserFirstName: { contains: query } },
        { Email: { contains: query } },
        { UserLastName: { contains: query } },
      ],
    },
    orderBy: [
      { UserLastName: "asc" },
      { UserFirstName: "asc" },
      { Id: "asc" },
    ],
  });
  return results;
}
```

Here, we're harnessing Prisma to fetch attendees based on the search query. The integration is seamless and efficient: the function interacts with the database and returns results, all within the very same server component file. No extraneous services, no separate endpoints—simplicity in its purest form.

### Unpacking the Potential of Server Components

Navigating to the URL `http://localhost:3001/admin/attendees-list?q=kellner`, the `q` parameter is directly passed to the server component. This direct approach offers a significant advantage over conventional React components by enabling instantaneous server-side interactions based on query parameters, eliminating the nuances of client-side hydration.

By handling data-fetching and UI rendering on the server-level, your app benefits from enhanced performance, reduced client-side JavaScript, and improved SEO, creating an overall streamlined experience for your users.

### Conclusion

The advent of React Server Components in Next.js 13 has heralded a new era in React development. The amalgamation of server-side logic directly within components paves the way for more efficient, faster, and streamlined applications.

If you haven't already ventured into the world of React Server Components in Next.js 13, now is the opportune moment. Their ability to process query parameters and handle server-side tasks within the component itself is bound to revolutionize your web development process. Dive in and witness the transformation.

If you want to learn more, I do have a full 4 hour course on Pluralsight that's all about React Server Components. It's called [Server Component Fundamentals in React 18](https://www.pluralsight.com/library/courses/react-18-server-component-fundamentals).
