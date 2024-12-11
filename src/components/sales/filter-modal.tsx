"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui';

interface FilterModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: string[];

    tempCategoryFilter: string;
    tempLocationFilter: string;
    tempAvailabilityFilter: string;

    setTempCategoryFilter: (val: string) => void;
    setTempLocationFilter: (val: string) => void;
    setTempAvailabilityFilter: (val: string) => void;

    onApply: () => void;
    onCancel: () => void;
    onReset: () => void;
}

const getButtonVariant = (currentVal: string, selectedVal: string) => {
    return currentVal === selectedVal ? 'default' : 'outline';
};

export const FilterModal: React.FC<FilterModalProps> = ({
    open,
    onOpenChange,
    categories,
    tempCategoryFilter,
    tempLocationFilter,
    tempAvailabilityFilter,
    setTempCategoryFilter,
    setTempLocationFilter,
    setTempAvailabilityFilter,
    onApply,
    onCancel,
    onReset,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="flex justify-between">
                    <DialogTitle>Filter Products</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center mx-auto mt-4">
                    <div className="mb-4 w-full text-center">
                        <h4 className="font-semibold mb-2">Category</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={getButtonVariant(tempCategoryFilter, 'all')}
                                onClick={() => setTempCategoryFilter('all')}
                            >
                                All Categories
                            </Button>
                            {categories.map((cat) => (
                                <Button
                                    key={cat}
                                    variant={getButtonVariant(tempCategoryFilter, cat)}
                                    onClick={() => setTempCategoryFilter(cat)}
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 w-full text-center">
                        <h4 className="font-semibold mb-2">Location</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={getButtonVariant(tempLocationFilter, 'all')}
                                onClick={() => setTempLocationFilter('all')}
                            >
                                All Locations
                            </Button>
                            <Button
                                variant={getButtonVariant(tempLocationFilter, 'Online')}
                                onClick={() => setTempLocationFilter('Online')}
                            >
                                Online
                            </Button>
                            <Button
                                variant={getButtonVariant(tempLocationFilter, 'Store')}
                                onClick={() => setTempLocationFilter('Store')}
                            >
                                Store
                            </Button>
                        </div>
                    </div>
                    <div className="mb-4 w-full text-center">
                        <h4 className="font-semibold mb-2">Availability</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={getButtonVariant(tempAvailabilityFilter, 'all')}
                                onClick={() => setTempAvailabilityFilter('all')}
                            >
                                All Availability
                            </Button>
                            <Button
                                variant={getButtonVariant(tempAvailabilityFilter, 'In Stock')}
                                onClick={() => setTempAvailabilityFilter('In Stock')}
                            >
                                In Stock
                            </Button>
                            <Button
                                variant={getButtonVariant(tempAvailabilityFilter, 'Low Stock')}
                                onClick={() => setTempAvailabilityFilter('Low Stock')}
                            >
                                Low Stock
                            </Button>
                            <Button
                                variant={getButtonVariant(tempAvailabilityFilter, 'Out of Stock')}
                                onClick={() => setTempAvailabilityFilter('Out of Stock')}
                            >
                                Out of Stock
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                <Button variant="outline" onClick={onReset}>
                        Reset All Filters
                    </Button>
                    <Button onClick={onApply} className="bg-primary text-white">
                        Apply
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
