"use client";

import React, { forwardRef, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

import { Icon } from '.';
import styles from './ToggleButton3.module.scss';

interface CommonProps {
    label?: string;
    selected: boolean;
    size?: 's' | 'm' | 'l';
    align?: 'start' | 'center';
    width?: 'fit' | 'fill';
    weight?: 'default' | 'strong';
    truncate?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
    href?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const ToggleButton3 = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | AnchorProps>(({
    label,
    selected,
    size = 'm',
    align = 'center',
    width = 'fit',
    weight = 'default',
    truncate = false,
    prefixIcon,
    suffixIcon,
    className,
    style,
    children,
    href,
    ...props
}, ref) => {
    const iconSize = size === 'l' ? 'm' : 's';

    const content = (
        <>
            <div className={styles.labelWrapper}>
                {prefixIcon && (
                    <Icon
                        name={prefixIcon}
                        size={iconSize}/>
                )}
                {label && (
                    <div className={`font-s font-label ${styles.label} ${weight === 'strong' ? 'font-strong' : 'font-default'} ${truncate ? styles.truncate : ''}`}>
                        {label}
                    </div>
                )}
                <div
                    className={styles.barHitArea}
                    onClick={(e) => {
                        e.stopPropagation(); // optional: prevent bubbling to parent button
                         (e.currentTarget.closest('button, a') as HTMLElement)?.click();
                    }}
                    >
                <div className={styles.barContainer}>
                    <div className={`${styles.bar} ${selected ? `${styles.barAbsolute} ${styles.barRotate1}` : ''}`} />
                    <div className={`${styles.bar2} ${selected ? `${styles.barAbsolute} ${styles.barRotate2}` : ''}`} />
                </div>
                </div>
                {children}
            </div>
            {suffixIcon && (
                <Icon
                    name={suffixIcon}
                    size={iconSize} />
            )}
        </>
    );

    const commonProps = {
        className: `${styles.button} ${selected ? styles.selected : ''} ${styles[size]} ${styles[align]} ${styles[width]} ${className || ''}`,
        style: { ...style, textDecoration: 'none' },
        'aria-pressed': selected,
        'aria-label': label || 'Toggle Button',
        tabIndex: 0,
    };

    if (href) {
        const isExternal = isExternalLink(href);

        if (isExternal) {
            return (
                <a
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}
                    {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                {...commonProps}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {content}
            </Link>
        );
    }

    return (
        <button
            {...commonProps}
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {content}
        </button>
    );
});

ToggleButton3.displayName = "ToggleButton";

export { ToggleButton3 };