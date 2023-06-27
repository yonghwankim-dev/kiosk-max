import Home from 'pages/Home';
import { useState } from 'react';
import './App.css';

export default function App() {
  return <Router />;
}

function Router() {
  const [page, setPage] = useState('/');
  const navigate = (path: string) => setPage(path);

  let content;
  const orderId = page.split('/')[3];

  switch (page) {
    case '/': {
      content = <Home navigate={navigate} />;
      break;
    }

    case `/receipt/orderId/${orderId}`: {
      // content = <Receipt orderId={orderId} />;
    }
  }
  return <div className="App">{content}</div>;
}
