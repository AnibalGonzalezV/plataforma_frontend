import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
  };
  storeId: number;
}

export function ProductCard({ product, storeId }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {product.image && (
          <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {product.description && (
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        )}
        <p className="text-2xl font-bold text-green-600">
          {new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
          }).format(product.price)}
        </p>
      </CardContent>
      <CardFooter>
        <AddToCartButton product={{ ...product, storeId }} className="w-full" />
      </CardFooter>
    </Card>
  );
} 