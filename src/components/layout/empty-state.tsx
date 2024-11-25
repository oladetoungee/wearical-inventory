import { images } from '@/data';
import Image from 'next/image';

interface EmptyStateProps {
    type: 'sales' | 'employee' | 'product'; 
}

export const EmptyState = ({ type }: EmptyStateProps) => {
    const messages: { [key in EmptyStateProps['type']]: string } = {
        sales: 'No Sale Recorded',
        employee: 'No Employee Added',
        product: 'No Product Added',
    };

    return (
        <div className="empty-state flex flex-col items-center justify-center text-center p-4">
            <Image
                src={images[type]}
                alt={`${type} empty state`}
                width={128}
                height={128}
                className="mb-4"
            />
            <p className="text-lg text-gray-500">{messages[type]}</p>
        </div>
    );
};
