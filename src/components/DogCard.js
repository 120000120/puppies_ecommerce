import { Link } from 'react-router-dom';

const DogCard = ({ dog }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="h-56 overflow-hidden">
        <img 
          src={dog.image} 
          alt={dog.name} 
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white truncate">{dog.name}</h3>
          <span className="bg-yellow-800 text-yellow-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {dog.size}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{dog.characteristics}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
            </svg>
            <span>{dog.weight}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            <span>{dog.height}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span>Camadas: {dog.litters}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-yellow-400">{formatPrice(dog.price)}</span>
            <span className="text-xs text-gray-400 ml-1">USD</span>
          </div>
          <div className="space-x-2">
            <Link
              to="/payment"
              state={{ pet: dog }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Comprar
            </Link>
            <a
              href={`https://wa.me/50661537799?text=${encodeURIComponent(`Hola, estoy interesado en este hermoso cachorrito ${dog.name} 🐕\n\n${dog.image}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogCard;