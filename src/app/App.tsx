import React from 'react';
import './App.css';
import EventLIst from './components/EventList';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

export const link = createHttpLink({
  uri: 'http://localhost:5000/api/gql',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <EventLIst />
        </header>
      </ApolloProvider>
    </div>
  );
}

export default App;
