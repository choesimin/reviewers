import StarRating from './StarRating';
import { useTheme } from '../layout';

interface Review {
  id: number;
  itemName: string;
  content: string;
  rating: number;
  date: string;
  author: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`border rounded-lg p-6 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{review.itemName}</h3>
        <StarRating rating={review.rating} interactive={false} />
      </div>
      
      <p className={`mb-4 leading-relaxed ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>{review.content}</p>
      
      <div className={`flex justify-between items-center text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <span>{review.author}</span>
        <span>{review.date}</span>
      </div>
    </div>
  );
}
