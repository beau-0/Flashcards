import { useParams, useLocation, Link } from "react-router-dom";


const NavigationBar = ({deckDescription, deckId}) => {

    let currentPath = '';
    const url = useLocation();
    const pages = url.pathname.split('/')
        .filter((page) => page !== '');

    const study = pages.includes('study');
    const newCard = pages.includes('new')
    
    return (
      <nav>
        <ul className="horizontal-nav">
          <li>
            <Link to="/">Home &gt; </Link>
          </li>
          {deckDescription && (
          <li>
            <Link to={`/decks/${deckId}`}>{deckDescription} &gt; </Link>
          </li>)}
          {study && (
          <li>
            <Link style={{ color: "gray" }}>Study</Link>
          </li>)}
          {newCard && (
          <li>
            <Link style={{ color: "gray" }}>Create</Link>
          </li>)}
        </ul>
      </nav>
    );
  };

  export default NavigationBar;





    /*
    let currentPath = '';
    const pages = url.pathname.split('/')
        .filter((page) => page !== '')
        .map((page) => {
            currentPath += `/${page}`

            return (
                <div key={page}>
                    <Link to={currentPath}>{page} |</Link>
                </div>
            )
        })
    
    return (
        <div>{pages}</div>
    )

}*/

