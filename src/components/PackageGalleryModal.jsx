import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PackageGalleryModal = ({
    isOpen,
    onClose,
    gallery,
    currentIndex,
    setCurrentIndex,
    onNext,
    onPrev
}) => {
    if (!isOpen || !gallery) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                >
                    <X size={24} />
                </button>

                <img
                    src={gallery[currentIndex] || "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"}
                    alt={`Package view ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />

                {gallery.length > 1 && (
                    <>
                        <button
                            onClick={onPrev}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={onNext}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {gallery.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PackageGalleryModal;
