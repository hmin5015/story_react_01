import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p><Link to='/'>Go to main page</Link></p>
    </main>
  )
}

export default Missing