'use client';

import React from 'react';
import { VariantSelectorProps } from '@/lib/interfaces';

const colorMap: Record<string, string> = {
    "Mint green": "#98ff98",
};

function isValidCSSColor(color: string): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariant, onChange }) => {
    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center">
                {variants.map((variant) => {
                    let dynamicColor = colorMap[variant.title];
                    if (!dynamicColor) {
                        dynamicColor = variant.title.replace(/\s+/g, '').toLowerCase();
                    }
                    if (!isValidCSSColor(dynamicColor)) {
                        dynamicColor = '#1F2937';
                    }
                    return (
                        <label key={variant.id} className="flex flex-col items-center space-y-1 cursor-pointer" style={{ width: '70px' }}>
                            <input
                                type="radio"
                                name="variant-selector"
                                value={variant.id}
                                checked={Number(selectedVariant) === variant.id}
                                onChange={() => onChange(variant.id)}
                                className="hidden peer"
                            />
                            <div
                                className="relative flex justify-center items-center w-10 h-10 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease peer-checked:ring-4 peer-checked:ring-blue-500 z-10"
                                style={{ backgroundColor: dynamicColor }}
                            />
                            <span className="block text-sm text-center">{variant.title}</span>
                        </label>
                    );
                })}
            </div>
            <select className="w-full border rounded p-2 mt-4" value={selectedVariant} onChange={(e) => onChange(Number(e.target.value))}>
                {variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                        {variant.title} - ${parseFloat(variant.price).toFixed(2)}
                    </option>
                ))}
            </select>
        </>
    );
};

export default VariantSelector;