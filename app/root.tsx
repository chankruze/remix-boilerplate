import { useEffect, useState } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from "@remix-run/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import styles from "~/styles/app.css";
import { navLinks } from "~/config";
import { NavBar } from "~/components/navbar";
import { SideBar } from "~/components/sidebar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix 🚀",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: nProgressStyles },
    { rel: "stylesheet", href: styles },
  ];
};

// disbale the loading spinner of nprogress
NProgress.configure({ showSpinner: false });

export default function App() {
  const transition = useTransition();
  const [isSideBarFolded, setIsSideBarFolded] = useState(false);
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* the main layout */}
        <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden select-none">
          <NavBar
            navLinks={navLinks}
            isSideBarCollapsed={isSideBarCollapsed}
            collapseSideBar={setIsSideBarCollapsed}
          />
          <div className="flex flex-1 overflow-hidden">
            {!isSideBarCollapsed && (
              <SideBar
                navLinks={navLinks}
                isFolded={isSideBarFolded}
                toggleFold={setIsSideBarFolded}
              />
            )}
            <main className="relative flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export function CatchBoundary() {
//   const caught = useCatch();

//   return (
//     <html>
//       <head>
//         <title>Oops!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <h1>
//           {caught.status} {caught.statusText}
//         </h1>
//         <Scripts />
//       </body>
//     </html>
//   );
// }
