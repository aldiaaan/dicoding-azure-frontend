import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DefaultFallback from "./components/DefaultFallback";
import Navbar from "./components/Navbar";

const Index = React.lazy(() => import("./views/Index"));
const BookInfo = React.lazy(() => import("./views/BookInfo"));
const AddBook = React.lazy(() => import("./views/AddBook"));
const UpdateBook = React.lazy(() => import("./views/UpdateBook"));
const SearchResult = React.lazy(() => import("./views/SearchResult"));

function Root() {
  return (
    <Switch>
      <Route path="/" exact>
        <React.Suspense fallback={<DefaultFallback />}>
          <Index />
        </React.Suspense>
      </Route>
      <Route path="/search">
        <React.Suspense fallback={<DefaultFallback />}>
          <SearchResult />
        </React.Suspense>
      </Route>
      <Route path="/book/add" exact>
        <React.Suspense fallback={<DefaultFallback />}>
          <AddBook />
        </React.Suspense>
      </Route>
      <Route path="/book/:id/update" exact>
        <React.Suspense fallback={<DefaultFallback />}>
          <UpdateBook />
        </React.Suspense>
      </Route>
      <Route path="/book/:id" exact>
        <React.Suspense fallback={<DefaultFallback />}>
          <BookInfo />
        </React.Suspense>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Root />
    </Router>
  );
}

export default App;
