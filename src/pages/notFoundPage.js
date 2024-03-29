import '../styles/notFoundPage.css';
import image from '../../src/assets/img/pnf.png'
function NotFoundPage() {
  return (
    <div className='outer-div'>
      <img src={image} alt="404" className='pnf-image' />
    </div>
  );
}

export default NotFoundPage;