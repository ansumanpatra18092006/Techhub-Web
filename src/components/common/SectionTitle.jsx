import React from 'react';
import GradientText from '../ui/GradientText';

export default function SectionTitle({
    subtitle,
    title,
    gradientTitle,
    description,
    centered = false,
    className = '',
}) {
    return (
        <div className={`heading-illuminated space-y-4 ${centered ? 'text-center' : 'text-left'} ${className}`}>
            {subtitle && (
                <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full">
                    {subtitle}
                </span>
            )}
            {title && (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F9FAFB] tracking-tight font-heading">
                    {title}{' '}
                    {gradientTitle && <GradientText>{gradientTitle}</GradientText>}
                </h2>
            )}
            {description && (
                <p className={`text-base sm:text-lg text-[#9CA3AF] leading-relaxed ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
                    {description}
                </p>
            )}
        </div>
    );
}