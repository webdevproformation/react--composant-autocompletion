import { useState } from 'react';
import './App.css';
import logo from './assets/react.svg';
import StripeContainer from './components/StripeContainer';

function App() {
  const [showItem, setShowItem] = useState(false);

  const produits = [
    {id : 1 , produit : "produit 1" , prix : 120 , qte : 2},
    {id : 2 , produit : "produit 2" , prix : 15.12 , qte : 3},
  ]
  const total = produits.reduce((total, item) => {return total + (item.qte * item.prix)} , 0)

  return (
    <div className='App'>
      <h1>Votre Panier</h1>
        <>
          <table>
            <tr>
               <th>#</th>
               <th>nom</th>
               <th>img</th>
               <th>prix unitaire HT</th>
               <th>qte</th>
               <th>total</th>
            </tr>
            {produits.map(p => {
              return <tr>
                 <td>{ p.id }</td>
                 <td>{ p.produit }</td>
                 <td className="text-center"><img src={logo} alt="" className="rotation" /></td>
                 <td className="text-end">{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p.prix) }</td>
                 <td className="text-end">{ p.qte }</td>
                 <td className="text-end">{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p.prix * p.qte )}</td>
              </tr>
            })}
            <tr>
              <td colSpan={5} className="text-end">total panier</td>
              <td className="text-end"> { new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total) } </td>
            </tr>
          </table>
        </>
        <h2>
          paiement via Stripe &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-stripe" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.662 7.662 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.29 7.29 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703Z"/>
          </svg>  
        </h2>
        <StripeContainer total={total} />
    </div>
  );
}

export default App;
